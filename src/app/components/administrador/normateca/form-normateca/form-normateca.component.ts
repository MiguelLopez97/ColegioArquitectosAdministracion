import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material

import { AsociacionService } from '../../../../services/asociacion.service';
import { NormatecaModel, NormatecaArchivoModel } from '../../../../models/normateca.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-normateca',
  templateUrl: './form-normateca.component.html',
  styleUrls: ['./form-normateca.component.scss'],
})
export class FormNormatecaComponent implements OnInit {
  public normateca: NormatecaModel = new NormatecaModel();
  public archivo: NormatecaArchivoModel = new NormatecaArchivoModel();
  public newArchivo: boolean;
  public titulo: string;
  public loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private _asociacionService: AsociacionService,
    public dialogRef: MatDialogRef<FormNormatecaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NormatecaModel //Recibe el dato del componente donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    if (this.data.idNormateca == null) {
      this.titulo = 'Agregar Normateca';
      this.newArchivo = true;
      this.loading = false;
    } else {
      this.titulo = 'Editar Normateca';
      this._asociacionService.getNormateca(this.data.idNormateca).subscribe(
        (response) => {
          console.log(response);
          this.normateca = response.data;
          this.newArchivo = this.normateca.archivo ? false : true;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  //Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    //Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  onChangeFile(event) {
    const archivo = this.fileInput.nativeElement.files[0];
    if (this._archivoPuedeSerCargado(archivo)) {
      // Constante de tipo FileReader para leer la información del archivo seleccionado
      const reader = new FileReader();

      // Separa el nombre del archivo y la extensión y los almacena en una arreglo
      const split = archivo.name.split('.');

      // Obtiene la extensión de un archivo de la constante 'split'
      const ext = split[split.length - 1];

      // Obtiene el nombre de un archivo sin la extensión
      const simpleName = archivo.name.substr(0, archivo.name.length - (ext.length + 1));

      // Lee la información de la variable 'file'
      reader.readAsDataURL(archivo);

      reader.onload = () => {
        // Asigna los valores a enviar a la API
        // console.log(reader.result.toString().split(',')[1]);
        this.archivo.fileContentBase64 = reader.result.toString().split(',')[1];
        this.archivo.fileName = simpleName;
        this.archivo.fileExt = ext;
      };
      reader.onerror = (error) => {
        console.log('Error Uploading PDF: ', error);
      };
    }
  }

  //Guarda los datos de la Normateca
  async saveNormateca() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    //Si el idNormateca existe
    if (this.normateca.idNormateca) {
      // Verificar si es una URL
      if (this.normateca.esURL) {
        //Actualiza los datos de la Normateca
        await this._asociacionService
          .updateNormateca(this.normateca)
          .then((response: any) => {
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
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          });
      } else {
        // Comprobar si anteriormente ya se tenia un URL
        if (this.normateca.archivo) {
          this.normateca.archivo = '';
        }
        // Si no es una URL subir el archivo en base64
        // Guardar el registro de la
        let requestSuccessCount = 0;
        let succVerification = this.newArchivo ? 2 : 1;
        this.archivo.idNormateca = this.normateca.idNormateca;

        // Si es un archivo
        //Actualiza los datos de la Normateca
        await this._asociacionService
          .updateNormateca(this.normateca)
          .then((response: any) => {
            console.log(response);
            if (response.success == true) {
              requestSuccessCount++;
              console.log('requestSuccessCount :>> ', requestSuccessCount);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al actualizar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          });

        if (this.newArchivo) {
          await this._asociacionService
            .updateNormatecaArchivo(this.archivo)
            .then((response: any) => {
              console.log(response);
              const data = response.data;
              if (response.success == true) {
                requestSuccessCount++;
                console.log('requestSuccessCount :>> ', requestSuccessCount);
                // });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al guardar los datos',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#2054A1',
                });
              }
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            });
        }

        console.log('requestSuccessCount :>> ', requestSuccessCount);
        if (requestSuccessCount === succVerification) {
          this.dialogRef.close({ statusResponse: true });
          Swal.fire({
            icon: 'success',
            title: 'Datos guardados correctamente',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      }
    } //Si no existe el idNormateca
    else {
      //Crea un nuevo registro de Normateca

      // Si es un URL
      if (this.normateca.esURL) {
        await this._asociacionService
          .createNormateca(this.normateca)
          .then((response: any) => {
            console.log(response);
            if (response.success == true) {
              //Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
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
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          });
      } else {
        // Si no es una URL subir el archivo en base64
        // Guardar el registro de la
        let requestSuccessCount = 0;

        await this._asociacionService
          .createNormateca(this.normateca)
          .then((response: any) => {
            console.log(response);
            const data = response.data;
            if (response.success == true) {
              this.archivo.idNormateca = response.data.idNormateca;
              requestSuccessCount++;
              // console.log('requestSuccessCount :>> ', requestSuccessCount);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          });

        await this._asociacionService
          .updateNormatecaArchivo(this.archivo)
          .then((response: any) => {
            console.log(response);
            if (response.success == true) {
              requestSuccessCount++;
              // console.log('requestSuccessCount :>> ', requestSuccessCount);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          });

        console.log('requestSuccessCount :>> ', requestSuccessCount);
        if (requestSuccessCount === 2) {
          //Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
          this.dialogRef.close({ statusResponse: true });
          Swal.fire({
            icon: 'success',
            title: 'Datos guardados correctamente',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      }
    }
  }

  // Validaciones para el input File
  private _archivoPuedeSerCargado(archivo: File): boolean {
    return this._esPDF(archivo.type) ? true : false;
  }

  private _esPDF(tipoArchivo: string): boolean {
    return tipoArchivo == '' || tipoArchivo == undefined ? false : tipoArchivo.startsWith('application');
  }
}
