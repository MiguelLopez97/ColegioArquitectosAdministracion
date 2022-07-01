import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Importación para recibir el valor que viene del modal de Agnular Material

import { SocioService } from 'app/services/socio.service';
import { UsuarioService } from 'app/services/usuario.service';
import { SocioModel } from 'app/models/socio.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-socio',
  templateUrl: './form-socio.component.html',
  styleUrls: ['./form-socio.component.scss'],
})
export class FormSocioComponent implements OnInit {
  public socio: SocioModel = new SocioModel();
  public avatar: string;
  public titulo: string;
  public loading: boolean = false;
  public loadingColonias: boolean = false;

  public allColonias: { idCd: number; col: string; cd: string; mpio: string; edo: string }[] = [];
  public fechaN: any;

  constructor(
    private _socioService: SocioService,
    private _usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<FormSocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el objeto Socio del componente donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    console.log('this.data :>> ', this.data);

    if (this.data.idSocio == null) {
      this.titulo = 'Agregar Socio';
      this.loading = false;
    } else {
      this.titulo = 'Editar Socio';
      // this.socio = this.data;
      this.getSocioInfo();
    }
  }

  // Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    // Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  // Validad que las teclas pulsadas sean únicamente números
  validaNumeros(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  getSocioInfo() {
    this._socioService.getSocioEdicion(this.data.idSocio).subscribe(
      (response: any) => {
        console.log(response.data);
        this.socio = response.data;
        // this.fechaN = this.socio.fechaNacimiento.slice(0, 10);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getColonias() {
    this.loadingColonias = true;
    this._socioService.getAllColonias(this.socio.codigoPostal).subscribe(
      (response) => {
        console.log(response);
        this.allColonias = response.data;
        this.loadingColonias = false;
      },
      (error) => {
        console.log(error);
        this.loadingColonias = false;
      }
    );
  }

  saveSocio(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => control.markAsTouched());
      return;
    }

    console.log(this.socio);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    // Si el idSocio existe
    if (this.socio.idSocio) {
      // Actualizar los datos de un Socio

      this.socio.curp = this.socio.curp.toUpperCase();
      this.socio.ife = this.socio.ife.toUpperCase();

      // Formater al fecha en formato yyyy-mm-dd
      // this.socio.fechaNacimiento = this.fechaN._d.toISOString().slice(0, 10);

      this._socioService.updateSocio(this.socio).subscribe(
        (response) => {
          console.log(response);
          if (response.success === true) {
            // Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
            this.dialogRef.close({ statusResponse: response.success });
            Swal.fire({
              icon: 'success',
              title: 'Datos actualizados correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error  al actualizar los datos',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      );
    } else {
      // Si no existe el idSocio
      // Crear un nuevo registro de Socio

      this.socio.idRol = 1;
      // Contraseña por defecto para todos los socios creados
      this.socio.contrasenia = 'cat2021';
      this.socio.nombre = this.socio.nombreCompleto;
      this.socio.token = '';
      this.socio.idUsuario = 0;
      this.socio.idSocio = 0;
      this.socio.celular = this.socio.telefonoMovil;

      this._usuarioService.saveUsuario(this.socio).subscribe(
        (response) => {
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
}
