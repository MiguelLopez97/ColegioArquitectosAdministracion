import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material

import { AsociacionService } from '../../../../services/asociacion.service';
import { PagosService } from '../../../../services/pagos.service';
import { AgendaFlyerModel, AgendaModel } from '../../../../models/agenda.model';

import Swal from 'sweetalert2';
import { ProductoModel } from 'app/models/producto.model';

@Component({
  selector: 'app-form-agenda',
  templateUrl: './form-agenda.component.html',
  styleUrls: ['./form-agenda.component.scss'],
})
export class FormAgendaComponent implements OnInit {
  public agenda: AgendaModel = new AgendaModel();
  public productos: ProductoModel[] = [];
  public paramUrl: string;
  public titulo: string;
  public loading: boolean = false;

  // Variables para el flyer
  public imagen: AgendaFlyerModel = new AgendaFlyerModel();
  public newArchivo: boolean = true;
  public esUrl: boolean = true;

  public imgUri: string;

  constructor(
    private _asociacionService: AsociacionService,
    private _pagosService: PagosService,
    public dialogRef: MatDialogRef<FormAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el dato del componente donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    //Obtiene el listado de los productos activos
    this.getProductosActivos();

    if (this.data.idAgenda == null) {
      this.titulo = 'Agregar Agenda';
      this.imgUri = '../../../../../assets/img/noFoto.jpg';
      this.loading = false;
      this.setArchivosTipoOrigen(true);
    } else {
      this.titulo = 'Editar Agenda';
      this._asociacionService.getAgenda(this.data.idAgenda).subscribe(
        (response) => {
          console.log(response);
          this.agenda = response.data;
          this.imgUri = this.agenda.flyer ? this.agenda.flyer : '../../../../../assets/img/noFoto.jpg';
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

  //Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    //Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  //Valida que las teclas pulsadas sean únicamente números
  validaNumeros(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  getProductosActivos() {
    this._pagosService.getAllProductos().subscribe(
      (response) => {
        this.productos = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setInfoProductos(producto: ProductoModel) {
    this.agenda.descripcion = producto.descripcion;
    this.agenda.costoSocio = producto.precioSocio;
    this.agenda.costoEstudiante = producto.precioEstudiante;
    this.agenda.costoPublico = producto.precioPublico;
  }

  setArchivosTipoOrigen(newNoticia: boolean): void {
    if (newNoticia) {
      this.esUrl = false;
      this.newArchivo = true;
    } else {
      this.esUrl = this.agenda.flyer.startsWith('http');
      this.newArchivo = false;
    }
    console.log([this.esUrl, this.newArchivo]);
  }

  onChangeFile(event, type: string) {
    this.newArchivo = true;
    console.log('newArchivo', this.newArchivo);
    //Muestra una previsualización de la imagen seleccionada localmente del input file 'Seleccionar imagen de portada'
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgUri = event.target.result;
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
        }
      };
      reader.onerror = (error) => {
        console.log('Error Uploading Flyer: ', error);
      };
    }
  }

  async saveAgenda(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    this.agenda.idTipo = 1;

    //Si el idAgenda existe
    if (this.agenda.idAgenda) {
      //Actualiza los datos de la Agenda
      this.imagen.idAgenda = this.agenda.idAgenda;
      this.agenda.flyer = '';

      await this._asociacionService
        .updateAgenda(this.agenda)
        .then((response: any) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log('esUrl', this.esUrl);
      console.log('newArchivo', this.newArchivo);
      if ((!this.esUrl || this.newArchivo) && this.imagen) {
        await this._asociacionService
          .saveFlyer(this.imagen)
          .then((response: any) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      this.dialogRef.close({ statusResponse: true });
      Swal.fire({
        icon: 'success',
        title: 'Datos guardados correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2054A1',
      });
    } //Si no existe el idAgenda
    else {
      //Crea un nuevo registro de Agenda
      this.agenda.flyer = '';

      await this._asociacionService
        .createAgenda(this.agenda)
        .then((response: any) => {
          console.log(response);
          this.imagen.idAgenda = response.data.idAgenda;
        })
        .catch((error) => {
          console.log(error);
        });

      if (!this.esUrl && this.imagen) {
        await this._asociacionService
          .saveFlyer(this.imagen)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      this.dialogRef.close({ statusResponse: true });
      Swal.fire({
        icon: 'success',
        title: 'Datos guardados correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2054A1',
      });
    }
  }

  private _countSuccessVerification(): number {
    if (!this.esUrl) {
      return 1;
    }
    return 0;
  }

  //Validaciones para el input File
  private _archivoPuedeSerCargado(archivo: File, type: string): boolean {
    if (type === 'img') return this._esImagen(archivo.type) ? true : false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return tipoArchivo == '' || tipoArchivo == undefined ? false : tipoArchivo.startsWith('image');
  }
}
