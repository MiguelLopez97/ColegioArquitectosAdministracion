import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; //Importaciones para el modal

import { AsociacionService } from '../../../services/asociacion.service';
import { AgendaModel } from '../../../models/agenda.model';
import { FormAgendaComponent } from './form-agenda/form-agenda.component';
import { DetalleAgendaComponent } from './detalle-agenda/detalle-agenda.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  providers: [NgbModal, NgbActiveModal],
})
export class AgendaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Propiedades para la tabla de Angular Material
  public agendas: AgendaModel[] = [];
  public loading: boolean = false;
  public displayedColumns: string[] = ['descripcion', 'organizador', 'contacto', 'telefono', 'email', 'opciones'];
  public dataSource = new MatTableDataSource<AgendaModel>(this.agendas);

  constructor(
    private _asociacionService: AsociacionService,
    private modalService: NgbModal, //Modal
    public dialog: MatDialog,
    public activeModal: NgbActiveModal //Modal
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getAllAgendas();

    //Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
  }

  //Paginación para la tabla
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Filtro de búsqueda para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Abre el modal de Angular Material
  openDialog(pIdAgenda?) {
    const dialogRef = this.dialog.open(FormAgendaComponent, {
      height: 'auto',
      width: '800px',
      data: { idAgenda: pIdAgenda }, //Mandamos el idNormateca al componente del Formulario para que pueda consultar a la API por el idNormateca
    });

    dialogRef.afterClosed().subscribe((result) => {
      //Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      //(Esto es para que haga el refresh de la tabla después de que se agregue, actualize o elimine un registro)
      if (result.statusResponse == true) {
        this.getAllAgendas();
      }
    });
  }

  //Abre el modal para visualizar detalles
  openDialogDetalles(pIdAgenda, pIdProducto) {
    const dialogRef = this.dialog.open(DetalleAgendaComponent, {
      height: 'auto',
      width: '600px',
      data: { idAgenda: pIdAgenda, idProducto: pIdProducto }, //Mandamos el idNormateca al componente del Formulario para que pueda consultar a la API por el idNormateca
    });
  }

  //Método para abrir el modal
  openModal(content) {
    this.modalService.open(content);
  }

  getAllAgendas() {
    this._asociacionService.getAllAgendas().subscribe(
      (response) => {
        console.log(response);
        this.dataSource.data = response.data.filter((e) => e.activo == true);
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAgenda(idAgenda) {
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2054A1',
      cancelButtonColor: '#78797A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Espere',
          text: 'Eliminando información',
        });
        Swal.showLoading();

        this._asociacionService.deleteAgenda(idAgenda).subscribe(
          (response) => {
            console.log(response);
            Swal.close();
            this.getAllAgendas();
            Swal.fire({
              icon: 'success',
              title: 'Datos eliminados correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
