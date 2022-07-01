import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CursoService } from '../../../services/curso.service';
import { FormCursoComponent } from './form-curso/form-curso.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loading = true;

  public displayedColumns: string[] = ['descripcion', 'sede', 'fechaInicio', 'fechaFin', 'horaInicio', 'horaFin', 'opciones'];
  public dataSource = new MatTableDataSource<any>(); //Propiedad para almacenar los datos que devuelva el API

  constructor(
    public dialog: MatDialog,
    private _cursoService: CursoService
  ) { }

  ngOnInit() {
    this.getAllCursos();

    //Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.paginator._intl.nextPageLabel = "Siguiente página";
    this.paginator._intl.firstPageLabel = "Primera página";
    this.paginator._intl.lastPageLabel = "Última página";
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

  getAllCursos()
  {
    this._cursoService.getAllCursos().subscribe(
      response => {
        console.log(response);
        this.dataSource.data = response.data;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  //Abre el modal de Angular Material
  openDialog(pIdCurso?) 
  {
    const dialogRef = this.dialog.open(FormCursoComponent, {
      height: 'auto',
      width: '800px',
      data: {idCurso: pIdCurso}, //Mandamos el idSlide al componente del Formulario para que pueda consultar a la API por el idSlide
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      //(Esto es para que haga el refresh de la tabla después de que se agregue o actualice un registro)
      if (result == undefined)
      {
        return;
      }
      else if (result.statusResponse == true)
      {
        this.getAllCursos();
      }
    });
  }

  deleteCurso(idCurso)
  {
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

        this._cursoService.deleteCurso(idCurso).subscribe(
          response => {
            console.log(response);
            if(response.success == true)
            {
              this.getAllCursos();
              Swal.fire({
                icon: 'success',
                title: 'Datos eliminados correctamente',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
            else
            {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar los datos',
                text: response.firstError,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        );
      }
    });
  }
}
