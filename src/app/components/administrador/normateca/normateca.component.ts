import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; //Importaciones para el modal

import { FormNormatecaComponent } from './form-normateca/form-normateca.component';
import { DetalleNormatecaComponent } from './detalle-normateca/detalle-normateca.component';
import { AsociacionService } from '../../../services/asociacion.service';
import { NormatecaModel } from '../../../models/normateca.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-normateca',
  templateUrl: './normateca.component.html',
  styleUrls: ['./normateca.component.scss'],
  providers: [NgbModal, NgbActiveModal],
})
export class NormatecaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Propiedades para la tabla de Angular Material
  public normatecas: NormatecaModel[] = [];
  public loading: boolean = false;
  displayedColumns: string[] = ['titulo', 'archivo', 'tags', 'opciones'];
  dataSource = new MatTableDataSource<NormatecaModel>(this.normatecas); //El dataSource toma el valor del arreglo 'normatecas'

  constructor(
    private _router: Router,
    private _asociacionService: AsociacionService,
    public dialog: MatDialog,
    private modalService: NgbModal, //Modal
    public activeModal: NgbActiveModal //Modal
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getAllNormatecas();

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
  openDialog(pIdNormateca?) {
    const dialogRef = this.dialog.open(FormNormatecaComponent, {
      height: 'auto',
      width: '600px',
      data: { idNormateca: pIdNormateca }, //Mandamos el idNormateca al componente del Formulario para que pueda consultar a la API por el idNormateca
    });

    dialogRef.afterClosed().subscribe((result) => {
      //Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      //(Esto es para que haga el refresh de la tabla después de que se agregue, actualize o elimine un registro)
      if (result.statusResponse == true) {
        this.getAllNormatecas();
      }
    });
  }

  // Abre el modal para viaulizar detalles
  openDialogDetalles(pIdNormateca) {
    const dialogRef = this.dialog.open(DetalleNormatecaComponent, {
      height: 'auto',
      width: '800px',
      data: { idNormateca: pIdNormateca }, // Mandamos el idNormateca al componente del Detalles para que pueda consultar a la API por el idNormateca
    });
  }

  getAllNormatecas() {
    this._asociacionService.getAllNormateca().subscribe(
      (response) => {
        console.log(response);
        this.dataSource.data = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteNormateca(idNormateca) {
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

        this._asociacionService.deleteNormateca(idNormateca).subscribe(
          (response) => {
            console.log(response);
            Swal.close();
            this.getAllNormatecas();
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
