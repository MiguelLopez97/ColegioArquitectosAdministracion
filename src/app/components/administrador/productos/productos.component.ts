import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; //Importaciones para el modal

import { PagosService } from 'app/services/pagos.service';
import { ProductoModel } from 'app/models/producto.model';
import { FormProductosComponent } from './form-productos/form-productos.component';
import { DetalleProductosComponent } from './detalle-productos/detalle-productos.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Propiedades para la tabla de Angular Material
  public productos: ProductoModel[] = [];
  public loading: boolean = false;
  public displayedColumns: string[] = ['codigo', 'descripcion', 'precioSocio', 'precioPublico', 'precioEstudiante', 'esActivo', 'opciones'];
  public dataSource = new MatTableDataSource<ProductoModel>(this.productos);

  constructor(
    private _pagosService: PagosService,
    private modalService: NgbModal, //Modal
    public dialog: MatDialog,
    public activeModal: NgbActiveModal //Modal
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getAllProductos();

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
  openDialog(pProducto?) {
    const dialogRef = this.dialog.open(FormProductosComponent, {
      height: 'auto',
      width: '600px',
      data: pProducto, //Mandamos el idNormateca al componente del Formulario para que pueda consultar a la API por el idNormateca
    });

    dialogRef.afterClosed().subscribe((result) => {
      //Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      //(Esto es para que haga el refresh de la tabla después de que se agregue, actualize o elimine un registro)
      if (result.statusResponse == true) {
        this.getAllProductos();
      }
    });
  }

  //Abre el modal para visualizar detalles
  openDialogDetalles(pProducto) {
    const dialogRef = this.dialog.open(DetalleProductosComponent, {
      height: 'auto',
      width: '400px',
      data: pProducto, //Mandamos el idNormateca al componente del Formulario para que pueda consultar a la API por el idNormateca
    });
  }

  //Método para abrir el modal
  openModal(content) {
    this.modalService.open(content);
  }

  getAllProductos() {
    this._pagosService.getAllProductos().subscribe(
      (response) => {
        // console.log(response);

        // Filtrar por los productos que esten activos
        this.dataSource.data = response.data.filter((p) => p.esActivo);
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProducto(idProducto) {
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

        this._pagosService.deleteProducto(idProducto).subscribe(
          (response) => {
            console.log(response);
            Swal.close();
            this.getAllProductos();
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
