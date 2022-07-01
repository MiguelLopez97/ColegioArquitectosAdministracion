import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog'; // Modal de Angular Material

import { SocioService } from '../../../services/socio.service';
import { SocioModel } from '../../../models/socio.model';
import { FormSocioComponent } from './form-socio/form-socio.component';
import { DetalleSocioComponent } from './detalle-socio/detalle-socio.component';
import { FormBajaSocioComponent } from './form-baja-socio/form-baja-socio.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.scss'],
})
export class SociosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public socios: SocioModel[] = [];
  public loading: boolean = false;
  displayedColumns: string[] = ['codigo', 'nombre', 'apellidoPat', 'apellidoMat', 'estatus', 'opciones'];
  dataSource = new MatTableDataSource<SocioModel>(this.socios); // El dataSource toma el valor del arreglo 'noticias'

  constructor(private _socioService: SocioService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loading = true;
    this.getSociosAfiliados();

    // Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
  }

  // Paginación para la tabla
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filtro de búsqueda para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Abre el modal de Angular Material
  openDialog(pSocio?) {
    const dialogRef = this.dialog.open(FormSocioComponent, {
      height: 'auto',
      width: '800px',
      data: pSocio, // Mandamos el idSocio al componente del Formulario para que pueda consultar a la API por el idSocio
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      // (Esto es para que haga el refresh de la línea del tiempo después de que se agregue o actualice un registro)
      if (result.statusResponse === true) {
        this.getSociosAfiliados();
      }
    });
  }

  // Abre el modal para visualizar detalles
  openDialogDetalles(pIdSocio) {
    const dialogRef = this.dialog.open(DetalleSocioComponent, {
      height: 'auto',
      width: '800px',
      data: { idSocio: pIdSocio }, // Mandamos el idSocio al componente del Detalles para que pueda consultar a la API por el idSocio
    });
  }

  // Abre el modal para dar de baja a un socio
  openDialogBaja(pIdSocio) {
    const dialogRef = this.dialog.open(FormBajaSocioComponent, {
      height: 'auto',
      width: '800px',
      data: { idSocio: pIdSocio }, // Mandamos el idSocio al componente de Baja para que pueda enviarlo en la petición PUT del endpoint
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      // (Esto es para que haga el refresh de la tabla después de que se registre la baja de un socio)
      if (result.statusResponse === true) {
        this.getSociosAfiliados();
      }
    });
  }

  getSociosAfiliados() {
    this._socioService.getSociosEditables().subscribe(
      (response) => {
        console.log(response);
        // Sólo mostrar en la tabla los usuarios que esten Activos
        this.dataSource.data = response.data.filter((s) => s.esActivo);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  deleteSocio(idSocio) {
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

        this._socioService.deleteSocio(idSocio).subscribe(
          (response) => {
            console.log(response);
            Swal.close();
            this.getSociosAfiliados();
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
