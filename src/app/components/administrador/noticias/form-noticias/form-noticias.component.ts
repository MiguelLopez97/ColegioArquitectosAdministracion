import { Component, OnInit, Inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material
import { v4 as uuidv4 } from 'uuid';

import { AsociacionService } from '../../../../services/asociacion.service';
import { NoticiaModel, NoticiaArchivoModel } from '../../../../models/noticia.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-noticias',
  templateUrl: './form-noticias.component.html',
  styleUrls: ['./form-noticias.component.scss'],
})
export class FormNoticiasComponent implements OnInit {
  public noticia: NoticiaModel = new NoticiaModel();
  public imagen: NoticiaArchivoModel = new NoticiaArchivoModel();
  public video: NoticiaArchivoModel = new NoticiaArchivoModel();
  public archivo: NoticiaArchivoModel = new NoticiaArchivoModel();
  public loading: boolean = false;
  public titulo: string;
  public editorStyle = { height: '400px' };

  public newArchivo: {
    image: boolean;
    video: boolean;
    archivo: boolean;
  } = { image: true, video: true, archivo: true };
  public esUrl: {
    image: boolean;
    video: boolean;
    archivo: boolean;
  } = { image: true, video: true, archivo: true };

  // Propiedad para almacenar el URI de la imagen de portada de la noticia
  public imgUri: string;

  // Propiedades para reemplazar el valor de base64 de una imagen a URL
  public fileNoticia = new NoticiaArchivoModel();
  public resultURL: string;
  public replaceBodyNoticia: string;

  /************* Módulos para Ngx-Quill *********/
  @ViewChild('quillFile') quillFileRef: ElementRef;
  public editorModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
      ],
      // Handlers: 'Modifican la acción original de los botones del editor por un método personalizado'
      handlers: {
        image: (image) => {
          this.customImageUpload(image);
        },
      },
    },
  };

  public quillInstanceRef: any;
  public quillFile: any;

  constructor(
    private _asociacionService: AsociacionService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<FormNoticiasComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el idNoticia del componente donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    if (this.data.idNoticia == null) {
      this.titulo = 'Agregar Noticia';
      this.imgUri = '../../../../../assets/img/noFoto.jpg';
      this.loading = false;
      this.setArchivosTipoOrigen(true);
    } else {
      this.titulo = 'Editar Noticia';
      this._asociacionService.getNoticia(this.data.idNoticia).subscribe(
        (response) => {
          console.log(response);
          this.noticia = response.data;
          this.imgUri = this.noticia.imagen;
          this.loading = false;
          this.setArchivosTipoOrigen(false);
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  // Crea la instancia del editor Quill para acceder a las propiedades del editor
  getEditorInstance(editorInstance: any) {
    this.quillInstanceRef = editorInstance;
  }

  customImageUpload(image: any) {
    // Aquí activamos una acción de clic en el campo de entrada del archivo, esto abrirá el explorador de archivos localmente
    this.quillFileRef.nativeElement.click();
  }

  quillFileSelected(ev: any) {
    // Después de seleccionar el archivo en el selector de archivos, manejamos el proceso de carga
    this.quillFile = ev.target.files[0];

    // Constante de tipo FileReader para leer la información del archivo seleccionado
    const reader = new FileReader();

    // Separa el nombre del archivo y la extensión y los almacena en una arreglo
    const split = this.quillFile.name.split('.');

    // Obtiene la extensión de un archivo de la constante 'split'
    const ext = split[split.length - 1];

    // Obtiene el nombre de un archivo sin la extensión
    const simpleName = this.quillFile.name.substr(0, this.quillFile.name.length - (ext.length + 1));

    // Lee la información de la variable 'file'
    reader.readAsDataURL(this.quillFile);

    reader.onload = async () => {
      // Asigna los valores a enviar a la API
      this.fileNoticia.idNoticia = this.noticia.idNoticia;
      this.fileNoticia.fileIsForBody = true;
      this.fileNoticia.fileContentBase64 = reader.result.toString().split(',')[1];
      this.fileNoticia.fileName = simpleName;
      this.fileNoticia.fileExt = ext;
      this.fileNoticia.tipoArchivo = 'IMG';

      await this._asociacionService
        .saveArchivoNoticia(this.fileNoticia)
        .then((response: any) => {
          console.log(response);
          this.resultURL = response.data;

          let range: any;
          const img = '<img class="img-within" src="' + this.resultURL + '"></img>';
          range = this.quillInstanceRef.getSelection();
          this.quillInstanceRef.clipboard.dangerouslyPasteHTML(range.index, img);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }

  // Escucha los cambios que se hagan en el editor 'Quill'
  onContentChanged(event: any) {
    event.content.ops.forEach(async (item) => {
      // Si la instancia de QuillEditor contiene imágenes en los objetos que se están recorriendo
      if (item.insert.image) {
        // Si la propiedad 'image' comienza con 'data:image/...'
        if (item.insert.image.startsWith('data')) {
          // Separa el valor de base64 de todo el string de 'item.insert.image'
          var base64Result = item.insert.image.split(',')[1];

          // Obtiene la extensión del string de 'item.insert.image'
          var extension = item.insert.image.split(';')[0].split('/')[1];

          // Asigna los valores a enviar a la API
          this.fileNoticia.idNoticia = this.noticia.idNoticia;
          this.fileNoticia.fileIsForBody = true;
          this.fileNoticia.fileContentBase64 = base64Result;
          this.fileNoticia.fileName = uuidv4(); // Asigna un id único para el nombre del archivo
          this.fileNoticia.fileExt = extension;
          this.fileNoticia.tipoArchivo = 'IMG';

          await this._asociacionService
            .saveArchivoNoticia(this.fileNoticia)
            .then((response: any) => {
              console.log(response);
              this.resultURL = response.data;

              // Reemplaza el valor de base64 por la URL que devuelva la API
              this.replaceBodyNoticia = this.noticia.cuerpo.replace(/data[^"]*/gm, this.resultURL);

              // Asigna el valor modificado del 'editor Quill' a 'Noticia.Cuerpo'
              this.noticia.cuerpo = this.replaceBodyNoticia;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  }

  setArchivosTipoOrigen(newNoticia: boolean): void {
    if (newNoticia) {
      this.esUrl.image = false;
      this.esUrl.video = true;
      this.esUrl.archivo = true;
      this.newArchivo.image = true;
      this.newArchivo.video = true;
      this.newArchivo.archivo = true;
    } else {
      this.esUrl.image = this.noticia.imagen.startsWith('http');
      this.esUrl.video = this.noticia.video.startsWith('http');
      this.esUrl.archivo = this.noticia.video.startsWith('http');
      // this.newArchivo.image = this.noticia.imagen ? false : true;
      this.esUrl.image = false;
      this.newArchivo.video = this.noticia.video ? false : true;
      this.newArchivo.archivo = this.noticia.archivo ? false : true;

      // Agregar timestamp al final del url de la url de la noticia
      const d = new Date();
    }
    console.log([this.esUrl, this.newArchivo]);
  }

  // Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    // Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  onChangeFile(event, type: string) {
    // Muestra una previsualización de la imagen seleccionada localmente del input file 'Seleccionar imagen de portada'
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgUri = event.target.result;
        // Detectar el cambio de la imagen y actualizar la pantalla
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    const archivo = event.target.files[0];
    if (this._archivoPuedeSerCargado(archivo, type)) {
      if (type === 'vid') {
        if (archivo.size > 11 * 1024 * 1024) {
          return;
        }
      }
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
        console.log(reader.result.toString().split(',')[1]);
        if (type === 'img') {
          this.imagen.fileContentBase64 = reader.result.toString().split(',')[1];
          this.imagen.fileName = simpleName;
          this.imagen.fileExt = ext;
          this.imagen.tipoArchivo = 'IMG';
        } else if (type === 'vid') {
          this.video.fileContentBase64 = reader.result.toString().split(',')[1];
          this.video.fileName = simpleName;
          this.video.fileExt = ext;
          this.imagen.tipoArchivo = 'VID';
        } else if (type === 'file') {
          this.archivo.fileContentBase64 = reader.result.toString().split(',')[1];
          this.archivo.fileName = simpleName;
          this.archivo.fileExt = ext;
        }
      };
      reader.onerror = (error) => {
        console.log('Error Uploading PDF: ', error);
      };
    }
  }

  async saveNoticia() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    // Si el idNoticia existe
    if (this.noticia.idNoticia) {
      // Actualiza los datos de la Noticia

      // Revisar cuantos de los archivos no son url para subir en base64
      let requestSuccessCount = 0;
      const countOfSuccess = this._countSuccessVerification() + 1;
      this.imagen.idNoticia = this.noticia.idNoticia;
      this.video.idNoticia = this.noticia.idNoticia;

      // if (this.imagen && this.noticia.imagen) this.noticia.imagen = '';
      // if (this.video && this.noticia.video) this.noticia.video = '';

      await this._asociacionService
        .updateNoticia(this.noticia)
        .then((response: any) => {
          console.log(response);
          if (response.success == true) {
            requestSuccessCount++;
          }
          /* else
          {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar los datos',
              text: response.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          } */
        })
        .catch((error) => {
          console.log(error);
          /* Swal.fire({
            icon: 'error',
            title: 'Error al actualizar los datos',
            text: error.firstError,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          }); */
        });

      // Guardar la imagen en base64
      if (!this.esUrl.image && this.imagen) {
        await this._asociacionService
          .saveArchivoNoticia(this.imagen)
          .then((response: any) => {
            console.log(response);
            if (response.success == true) {
              requestSuccessCount++;
            }
            /* else
            {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            } */
          })
          .catch((error) => {
            console.log(error);
            /* Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: error.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            }); */
          });
      }

      // Guardar el video en base64
      if (!this.esUrl.video && this.video) {
        await this._asociacionService
          .saveArchivoNoticia(this.video)
          .then((response: any) => {
            console.log(response);
            if (response.success == true) {
              requestSuccessCount++;
            }
            /* else
            {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            } */
          })
          .catch((error) => {
            console.log(error);
            /* Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: error.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            }); */
          });
      }

      // Cambiar el estado de la noticia entre "archivado" o "publicado"
      if (this.noticia.archivado) {
        await this._asociacionService
          .archivarNoticia(this.noticia.idNoticia, this.noticia.archivado)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // if (requestSuccessCount === countOfSuccess) {
      // Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
      this.dialogRef.close({ statusResponse: true });
      Swal.fire({
        icon: 'success',
        title: 'Datos guardados correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2054A1',
      });
      // }
    } // Si no existe el idNoticia
    else {
      // Crea un nuevo registro de Noticia

      // Revisar cuantos de los archivos no son url para subir en base64
      let requestSuccessCount = 0;
      const countOfSuccess = this._countSuccessVerification() + 1;

      await this._asociacionService
        .createNoticia(this.noticia)
        .then((response: any) => {
          console.log(response);
          if (response.success == true) {
            this.imagen.idNoticia = response.data.idNoticia;
            this.video.idNoticia = response.data.idNoticia;
            requestSuccessCount++;
          }
          /* else
          {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: response.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
            return;
          } */
        })
        .catch((error) => {
          console.log(error);
          /* Swal.fire({
            icon: 'error',
            title: 'Error al guardar los datos',
            text: error.firstError,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          }); */
        });

      // Guardar la imagen en base64
      if (!this.esUrl.image && this.imagen) {
        await this._asociacionService
          .saveArchivoNoticia(this.imagen)
          .then((response: any) => {
            console.log(response);
            if (response.success == true) {
              requestSuccessCount++;
            }
            /* else
            {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            } */
          })
          .catch((error) => {
            console.log(error);
            /* Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: error.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            }); */
          });
      }

      // Guardar el video en base64
      if (!this.esUrl.video && this.video) {
        await this._asociacionService
          .saveArchivoNoticia(this.video)
          .then((response: any) => {
            console.log(response);
            if (response.success == true) {
              requestSuccessCount++;
            }
            /* else
            {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            } */
          })
          .catch((error) => {
            console.log(error);
            /* Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: error.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            }); */
          });
      }

      // if (requestSuccessCount === countOfSuccess) {
      // Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
      this.dialogRef.close({ statusResponse: true });
      Swal.fire({
        icon: 'success',
        title: 'Datos guardados correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2054A1',
      });
      // }
    }
  }

  private _countSuccessVerification(): number {
    if (!this.esUrl.image && !this.esUrl.video) {
      return 2;
    } else if (!this.esUrl.image || !this.esUrl.video) {
      return 1;
    }
    return 0;
  }

  // Validaciones para el input File
  private _archivoPuedeSerCargado(archivo: File, type: string): boolean {
    if (type === 'img') return this._esImagen(archivo.type) ? true : false;
    if (type === 'vid') return this._esVideo(archivo.type) ? true : false;
    if (type === 'file') return this._esArchivo(archivo.type) ? true : false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return tipoArchivo == '' || tipoArchivo == undefined ? false : tipoArchivo.startsWith('image');
  }

  private _esVideo(tipoArchivo: string): boolean {
    return tipoArchivo == '' || tipoArchivo == undefined ? false : tipoArchivo.startsWith('video');
  }

  private _esArchivo(tipoArchivo: string): boolean {
    return tipoArchivo == '' || tipoArchivo == undefined ? false : tipoArchivo.startsWith('application');
  }
}
