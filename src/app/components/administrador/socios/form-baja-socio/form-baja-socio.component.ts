import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// Importación para recibir el valor que viene del modal de Angular Material

import { SocioService } from 'app/services/socio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-baja-socio',
  templateUrl: './form-baja-socio.component.html',
  styleUrls: ['./form-baja-socio.component.scss'],
})
export class FormBajaSocioComponent implements OnInit {
  public motivoBaja: string;

  constructor(
    private _socioService: SocioService,
    public dialogRef: MatDialogRef<FormBajaSocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el parámetro idSocio del componente donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {}

  // Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    // Se agrega el parámtero 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  saveBaja(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => control.markAsTouched());
      return;
    }

    console.log(this.motivoBaja);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    this._socioService.saveBaja(this.data.idSocio, this.motivoBaja).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success === true) {
          // Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
          this.dialogRef.close({ statusResponse: response.success });
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
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      },
      (error) => {
        console.log(error);
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
