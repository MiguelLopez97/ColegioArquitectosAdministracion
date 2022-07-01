import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CotizacionModel } from 'app/models/cotizacion.model';
import { ProyectoService } from 'app/services/proyecto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.component.html',
  styleUrls: ['./detalle-cotizacion.component.scss'],
})
export class DetalleCotizacionComponent implements OnInit {
  public cotizacion = new CotizacionModel();
  public loading: boolean = false;

  constructor(
    private _proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<DetalleCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el idCotizacion de la tabla donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getCotizacion();
  }

  // Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    /**
     * Se agrega el parámetro 'statusResponse' para que no marque error al dar
     * click en el botón 'Cancelar' del formulario
     */
    this.dialogRef.close({ statusResponse: false });
  }

  getCotizacion() {
    this._proyectoService.getCotizacion(this.data.idCotizacion).subscribe(
      (response: any) => {
        console.log(response);
        this.cotizacion = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  aprobarCotizacion() {
    /**
     * Actualizar el Estatus de la cotización al idEstatus = 3 (Aprobado)
     */

    Swal.fire({
      title: '¿Está seguro que desea autorizar la cotización?',
      text: 'Si autoriza la cotización, se va a generar al socio su cargo por aranceles para el pago en línea',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2054A1',
      cancelButtonColor: '#78797A',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Espere',
          text: 'Actualizando estatus',
        });

        Swal.showLoading();

        this._proyectoService.updateCotizacion(this.data.idCotizacion, 3).subscribe(
          (response: any) => {
            console.log(response);
            if (response.success === true) {
              this.dialogRef.close({ statusResponse: true });
              Swal.fire({
                icon: 'success',
                title: 'Datos actualizados correctamente',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
          },
          (error) => {
            this.dialogRef.close({ statusResponse: false });
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        );
      }
    });
  }

  rechazarCotizacion() {
    /**
     * Actualizar el Estatus de la cotización al idEstatus = 4 (Rechazado)
     */
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Actualizando estatus',
    });
    Swal.showLoading();

    this._proyectoService.updateCotizacion(this.data.idCotizacion, 4).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success === true) {
          this.dialogRef.close({ statusResponse: true });
          Swal.fire({
            icon: 'success',
            title: 'Datos guardados correctamente',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      },
      (error) => {
        this.dialogRef.close({ statusResponse: false });
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar los datos',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2054A1',
        });
      }
    );
  }
}
