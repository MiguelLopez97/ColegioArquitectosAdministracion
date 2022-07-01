import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; //Modal de Angular Material

import { AsociacionService } from '../../../services/asociacion.service';
import { NoticiaModel } from '../../../models/noticia.model';
import { FormNoticiasComponent } from './form-noticias/form-noticias.component';
import { DetalleNoticiaComponent } from './detalle-noticia/detalle-noticia.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public noticias: NoticiaModel[] = [];
  public loading: boolean = false;
  displayedColumns: string[] = ['titulo', 'resumen', 'estatus', 'imagen', 'opciones'];
  dataSource = new MatTableDataSource<NoticiaModel>(this.noticias); //El dataSource toma el valor del arreglo 'noticias'

  constructor(private _asociacionService: AsociacionService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loading = true;
    this.getAllNoticias();

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
  openDialog(pIdNoticia?) {
    const dialogRef = this.dialog.open(FormNoticiasComponent, {
      height: 'auto',
      width: '1000px',
      data: { idNoticia: pIdNoticia }, //Mandamos el idNoticia al componente del Formulario para que pueda consultar a la API por el idNoticia
    });

    dialogRef.afterClosed().subscribe((result) => {
      //Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      //(Esto es para que haga el refresh de la línea del tiempo después de que se agregue o actualice un registro)
      if (result.statusResponse == true) {
        this.getAllNoticias();
      }
    });
  }

  //Abre el modal para visualizar detalles
  openDialogDetalles(pIdNoticia) {
    const dialogRef = this.dialog.open(DetalleNoticiaComponent, {
      height: 'auto',
      width: '800px',
      data: { idNoticia: pIdNoticia }, //Mandamos el idNoticia al componente del Detalles para que pueda consultar a la API por el idNoticia
    });
  }

  getAllNoticias() {
    this._asociacionService.getAllNoticias().subscribe(
      (response) => {
        console.log(response);
        this.dataSource.data = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  deleteNoticia(idNoticia: number) {
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

        this._asociacionService.deleteNoticia(idNoticia).subscribe(
          (response) => {
            console.log(response);
            Swal.close();
            this.getAllNoticias();
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
