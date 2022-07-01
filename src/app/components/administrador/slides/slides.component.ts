import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; //Modal de Angular Material

import { AsociacionService } from '../../../services/asociacion.service';
import { SlideModel } from '../../../models/slide.model';
import { FormSlideComponent } from './form-slide/form-slide.component';
import { DetalleSlideComponent } from './detalle-slide/detalle-slide.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public slides: SlideModel[] = [];
  public loading: boolean = false;
  public displayedColumns: string[] = ['foto', 'fechaActualizacion', 'opciones'];
  public dataSource = new MatTableDataSource<SlideModel>(this.slides); //El dataSource toma el valor del arreglo 'slides'

  constructor(
    public dialog: MatDialog,
    private _asociacionService: AsociacionService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getSlides();

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

  //Abre el modal de Angular Material
  openDialog(pIdSlide?) 
  {
    const dialogRef = this.dialog.open(FormSlideComponent, {
      height: 'auto',
      width: '800px',
      data: {idSlide: pIdSlide}, //Mandamos el idSlide al componente del Formulario para que pueda consultar a la API por el idSlide
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      //(Esto es para que haga el refresh de la tabla después de que se agregue o actualice un registro)
      if (result.statusResponse == true)
      {
        this.getSlides();
      }
    });
  }

  //Abre el modal para visualizar detalles
  openDialogDetalles(pIdSlide)
  {
    const dialogRef = this.dialog.open(DetalleSlideComponent, {
      height: 'auto',
      width: '800px',
      data: {idSlide: pIdSlide}, //Mandamos el idSlide al componente del Detalles para que pueda consultar a la API por el idSlide
    });
  }

  getSlides()
  {
    this._asociacionService.getSlides().subscribe(
      response => {
        console.log(response);
        this.slides = response.data;
        this.dataSource.data = response.data;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  deleteImageSlide(idSlide)
  {
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2054A1',
      cancelButtonColor: '#78797A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then( result => {
      if (result.value) {

        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Espere',
          text: 'Eliminando información'
        });
        Swal.showLoading();

        this._asociacionService.deleteSlide(idSlide).subscribe(
          response => {
            console.log(response);
            this.getSlides();
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
