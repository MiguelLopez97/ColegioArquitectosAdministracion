import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { CursoService } from '../../../../services/curso.service';
import { FormEspecialidadComponent } from '../form-especialidad/form-especialidad.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-especialidades',
  templateUrl: './table-especialidades.component.html',
  styleUrls: ['./table-especialidades.component.scss']
})
export class TableEspecialidadesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Propiedades para la tabla de Angular Material
  public loading: boolean = true;
  public displayedColumns: string[] = ['nombre', 'horas', 'opciones'];
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _cursoService: CursoService
  ) { }

  ngOnInit() {
    this.getAllEspecialidadCurso();

    //Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.paginator._intl.nextPageLabel = "Siguiente página";
    this.paginator._intl.firstPageLabel = "Primera página";
    this.paginator._intl.lastPageLabel = "Última página";
  }

  //Paginación y Ordenamiento para la tabla
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

  getAllEspecialidadCurso()
  {
    this._route.params.subscribe(params => {
      this._cursoService.getAllEspecialidadCurso(params['idCurso']).subscribe(
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
    });
  }

  //Abre el modal del formulario de Especialidad
  openDialog(pIdCurso?) 
  {
    const dialogRef = this.dialog.open(FormEspecialidadComponent, {
      height: 'auto',
      width: '800px',
      data: {idCurso: pIdCurso}, //Mandamos el idCurso al componente del Formulario para que pueda consultar a la API por el idCurso
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
        this.getAllEspecialidadCurso();
      }
    });
  }

  deleteEspecialidad(idEspecialidad)
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

        this._cursoService.deleteEspecialidad(idEspecialidad).subscribe(
          response => {
            console.log(response);
            Swal.close();
            this.getAllEspecialidadCurso();
            Swal.fire({
              icon: 'success',
              title: 'Datos eliminados correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el registro',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        );
      }
    });
  }

}
