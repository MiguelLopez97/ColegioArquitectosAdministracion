import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Importanción para recibir el valor que viene del modal de Angular Material

import { PagosService } from 'app/services/pagos.service';
import { ProductoModel } from 'app/models/producto.model';
import { TiposDeEventosModel } from 'app/models/tipos-de-eventos.model';
import { AsociacionService } from 'app/services/asociacion.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.scss'],
})
export class FormProductosComponent implements OnInit {
  public producto: ProductoModel = new ProductoModel();
  public tipos_eventos: TiposDeEventosModel[] = [];
  public paramUrl: string;
  public titulo: string;
  public loading: boolean = false;

  constructor(
    private _asociacionService: AsociacionService,
    private _pagosService: PagosService,
    public dialogRef: MatDialogRef<FormProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el objeto Producto del componente donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getTiposDeEventos();

    if (this.data.idProducto == null) {
      this.titulo = 'Agregar Producto';
      this.loading = false;
    } else {
      this.titulo = 'Editar Producto';
      this.producto = this.data;
      this.loading = false;
    }
  }

  // Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    // Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  // Valida que las teclas pulsadas sean únicamente números
  validaNumeros(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  getTiposDeEventos() {
    this._asociacionService.getTiposDeEvento().subscribe(
      (response) => {
        this.tipos_eventos = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveAgenda(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    console.log(this.producto);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    // Si el idProducto existe
    if (this.producto.idProducto) {
      // Actualizar los datos de la Agenda
      this._pagosService.updateProducto(this.producto).subscribe(
        (response) => {
          console.log(response);
          if (response.success == true) {
            //Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
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
            title: 'Error al actualizar los datos',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      );
    } else {
      // Si no existe el idAgenda
      // Crea un nuevo registro de Producto
      this._pagosService.saveProducto(this.producto).subscribe(
        (response) => {
          console.log(response);
          if (response.success == true) {
            // Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la repuesta (en este caso 'true')
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
