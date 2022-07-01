import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AsociacionService } from '../../../../services/asociacion.service';
import { FileItem } from '../../../../models/file-item.model';
import { SlideModel } from '../../../../models/slide.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-slide',
  templateUrl: './form-slide.component.html',
  styleUrls: ['./form-slide.component.scss']
})
export class FormSlideComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef; //Propiedad para el input File
  
  public imageSlide: FileItem[] = [];
  public estaSobreElemento: boolean = false;
  public slide = new SlideModel();
  public titulo: string;

  //Formularios reactivos
  //public slideForm: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _asociacionService: AsociacionService,
    public dialogRef: MatDialogRef<FormSlideComponent>,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el idSlide del componente donde se abre el modal de Angular Material
  ) { 
    //this.buildForm();
  }

  ngOnInit() {
    if (this.data.idSlide == null)
    {
      this.titulo = 'Subir imagen';
    }
    else
    {
      this.titulo = 'Actualizar imagen';
      this.getSlide();
    }
  }
  
  /*get textoNoValido() {
    return this.slideForm.get('textoSlide').hasError('required');
  }

  //Crea el formulario reactivo para obtener el texto del slide
  buildForm()
  {
    this.slideForm = this._formBuilder.group({
      textoSlide: ['', Validators.required]
    });
  }*/

  //Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void
  {
    //Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({statusResponse: false});
  }

  onChangeFile(event)
  {
    const selectedFiles = this.fileInput.nativeElement.files;
    for (let i = 0; i < selectedFiles.length; i++) 
    {
      const archivoExtraidoDeInput = selectedFiles[i];
      if(this._archivoPuedeSerCargado(archivoExtraidoDeInput))
      {
        const archivoParaCargar = new FileItem(archivoExtraidoDeInput);

        if (this.imageSlide.length == 0)
        {
          this.imageSlide.push(archivoParaCargar);
        }
        else
        {
          this.imageSlide[0] = archivoParaCargar;
        }
      }
    }
  }

  getSlide()
  {
    this._asociacionService.getSlide(this.data.idSlide).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }  

  cargarImagenSlide()
  {
    /*if(this.slideForm.invalid) {
      Object.values(this.slideForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }*/

    let file;

    //Constante de tipo FileReader para leer la información de los archivos seleccionados
    const reader = new FileReader();

    //Separa el nombre del archivo y la extensión y los almacena en un arreglo
    const split = this.imageSlide[0].archivo.name.split('.');

    //Obtiene la extensión de un archivo de la constante 'split'
    const ext = split[split.length - 1];

    //Obtiene el nombre de un archivo sin la extensión
    const simpleName = this.imageSlide[0].archivo.name.substr(0, this.imageSlide[0].archivo.name.length - (ext.length + 1));

    //Se iguala la variable 'file' al archivo que se haya seleccionado desde el componente
    file = this.imageSlide[0].archivo;

    //Lee la información de la variable 'file'
    reader.readAsDataURL(file);

    reader.onload = () => {
      //Asigna los valores a enviar a la API
      this.slide.fileContentBase64 = reader.result.toString().split(',')[1];
      this.slide.fileName = simpleName;
      this.slide.fileExt = ext;
      this.slide.texto = '.';

      Swal.fire({
        allowOutsideClick: false,
        icon:'info',
        title: 'Espere',
        text: 'Guardando archivo'
      });
      Swal.showLoading();

      //Si no viene un idSlide en la 'data' del modal
      if (this.data.idSlide == null)
      {
        //Crea un nuevo registro de Slide
        this._asociacionService.createSlide(this.slide).subscribe(
          response => {
            console.log(response);
            if (response.success == true)
            {
              //Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
              this.dialogRef.close({statusResponse: response.success});
              Swal.fire({
                icon: 'success',
                title: 'Imagen cargada correctamente',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
            else
            {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al subir la imagen. Intente más tarde',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }            
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al subir la imagen. Intente más tarde',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        );
      }
      else //En caso contrario
      {
        //Asigna el IdSlide que viene de la 'data' del modal para poder actualizar el slide
        this.slide.idSlide = this.data.idSlide;
        
        //Actualiza un registro de Slide
        this._asociacionService.updateSlide(this.slide).subscribe(
          response => {
            console.log(response);
            if (response.success == true)
            {
              //Cierra el modal de Angular Material y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
              this.dialogRef.close({statusResponse: response.success});
              Swal.fire({
                icon: 'success',
                title: 'Imagen actualizada correctamente',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
            else
            {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar la imagen. Intente más tarde',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al actualizar la imagen. Intente más tarde',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        );
      }
    };  
  }

  limpiarArchivo()
  {
    this.imageSlide = [];
  }

  //Validaciones para el input File
  private _archivoPuedeSerCargado(archivo: File): boolean
  {
    if(!this._archivoYaFueSeleccionado(archivo.name) && this._esImagen(archivo.type))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  private _archivoYaFueSeleccionado(nombreArchivo: string): boolean
  {
    for(const archivo of this.imageSlide)
    {
      if(archivo.nombreArchivo == nombreArchivo)
      {
        console.log('El archivo ' + nombreArchivo + ' ya está agregado');
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo: string): boolean
  {
    return (tipoArchivo == '' || tipoArchivo == undefined) ? false : tipoArchivo.startsWith('image');
  }

}
