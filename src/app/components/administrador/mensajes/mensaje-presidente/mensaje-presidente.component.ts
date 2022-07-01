import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // Modal de Angular Material

import { MensajePresidente, RequestMensajePresidente } from 'app/models/mensaje-presidente.model';
import { AsociacionService } from 'app/services/asociacion.service';
import { DetalleMensajeComponent } from './detalle-mensaje/detalle-mensaje.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensaje-presidente',
  templateUrl: './mensaje-presidente.component.html',
  styleUrls: ['./mensaje-presidente.component.scss'],
})
export class MensajePresidenteComponent implements OnInit {
  loading: boolean;
  newMensaje: boolean;
  registro: RequestMensajePresidente = new RequestMensajePresidente();
  requestMessages: RequestMensajePresidente;
  minDate: Date = new Date();
  fechaDesde: any;
  fechaHasta: any;
  title: string;
  mensajes: MensajePresidente[] = [];
  displayedColumns: string[] = ['idMensaje', 'mensaje', 'desde', 'hasta', 'opciones'];
  dataSource = new MatTableDataSource<MensajePresidente>(this.mensajes); // El dataSource toma el valor del arreglo 'mensajes'

  @ViewChild('mensaje') mensaje: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _asocacionService: AsociacionService, public dialog: MatDialog) {}

  ngOnInit() {
    this.registro.idTipoComunicacion = 2;
    this.registro.contacto = '.';
    this.registro.telefono = '.';

    this.loading = true;
    this.newMensaje = true;
    this.title = 'Agregar nuevo mensaje';
    this.getAllMensajes();

    // Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
  }

  // Paginación para la tabla
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  //Valida que las teclas pulsadas sean únicamente números
  validaNumeros(event) {
    if (event.charCode >= 47 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  getAllMensajes() {
    this._asocacionService.getMensajes().subscribe(
      (response) => {
        console.log(response);
        this.dataSource.data = response.data;
        this.loading = false;
      },
      (error) => {
        console.log('error :>> ', error);
        this.loading = false;
      }
    );
  }

  // Abre el modal para visualizar detalles
  openDialogDetalles(mensaje) {
    const dialogRef = this.dialog.open(DetalleMensajeComponent, {
      height: 'auto',
      width: '800px',
      data: { data: mensaje }, // Mandamos el objeto completo con toda la informacion del mensaje para no tener que realizar segunda consulta
    });
  }

  async saveMensaje(form: NgForm) {
    console.log('this.fechaDesde :>> ', this.fechaDesde);
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    if (this.fechaDesde._d && this.fechaHasta._d) {
      this.registro.vigenteDesde = this.fechaDesde._d.toISOString();
      this.registro.vigenteHasta = this.fechaHasta._d.toISOString();
    } else {
      this.registro.vigenteDesde = this.fechaDesde;
      this.registro.vigenteHasta = this.fechaHasta;
    }

    console.log('this.registro :>> ', this.registro);

    if (this.newMensaje) {
      // Si el idNormateca existe
      this._asocacionService.saveMensaje(this.registro).subscribe(
        (response: any) => {
          console.log('response :>> ', response);
          if (response.success) {
            this.newMensaje = true;
            form.resetForm();
            this.getAllMensajes();

            Swal.fire({
              icon: 'success',
              title: 'Datos guardados correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: response.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        },
        (error) => {
          console.log('error :>> ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar los datos',
            text: error.firstError,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      );
    } else if (!this.newMensaje) {
      // Si es un nuevo registro
      this._asocacionService.updateMensaje(this.registro).subscribe(
        (response: any) => {
          console.log('response :>> ', response);
          if (response.success) {
            this.newMensaje = true;
            form.resetForm();
            this.getAllMensajes();

            Swal.fire({
              icon: 'success',
              title: 'Datos actaulizados correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar los datos',
              text: response.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        },
        (error) => {
          console.log('error :>> ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar los datos',
            text: error.firstError,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      );
    }
  }

  nuevoMensaje(form: NgForm) {
    this.title = 'Agregar nuevo mensaje';
    this.newMensaje = true;
    this.registro = new RequestMensajePresidente();
    form.resetForm();
  }

  updateMensaje(mensaje: MensajePresidente) {
    this.title = 'Editar mensaje';
    this.newMensaje = false;
    this.registro = {
      idComunicacion: mensaje.idMensaje,
      idTipoComunicacion: mensaje.idTipoComunicacion,
      mensaje: mensaje.mensaje,
      vigenteDesde: mensaje.vigenteDesde,
      vigenteHasta: mensaje.vigenteHasta,
      contacto: mensaje.contacto,
      telefono: mensaje.telefono,
    };

    this.fechaDesde = mensaje.vigenteDesde;
    this.fechaHasta = mensaje.vigenteHasta;

    console.log('this.registro :>> ', this.registro);
  }

  deleteMensaje(idMensaje: number) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este registro?',
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
          text: 'Eliminando registro',
        });
        Swal.showLoading();

        this._asocacionService.deleteMensaje(idMensaje).subscribe(
          (response: any) => {
            console.log(response);
            Swal.close();
            this.getAllMensajes();
            Swal.fire({
              icon: 'success',
              title: 'Registro eliminado correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          },
          (error) => {
            console.log('error :>> ', error);
          }
        );
      }
    });
  }
}
