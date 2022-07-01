import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material

import { CursoService } from '../../../../services/curso.service';
import { PagosService } from '../../../../services/pagos.service';
import { CursoModel } from '../../../../models/curso.model';

import Swal from 'sweetalert2';

//Librería para convertir formatos de tipo Fecha
import * as moment from 'moment';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.scss']
})
export class FormCursoComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef; //Propiedad para cargar el flyer del Curso

  public cursoForm: FormGroup;

  public title: string;
  public loading: boolean = true;
  public imgUri: string = '../../../../../assets/img/noFoto.jpg';

  public idCurso: number;
  public curso = new CursoModel();
  public instructores: any[] = [];
  public productos: any[] = [];

  public errorRangoHoras: boolean;
  public errorRangoFechas: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormCursoComponent>,
    private _route: ActivatedRoute,
    private _cursoService: CursoService,
    private _pagosService: PagosService
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.idCurso = params['idCurso'];
      if (params['idCurso'] == undefined)
      {
        this.title = 'Agregar curso';
        this.getAllProductos();
        this.getAllInstructoresCurso();
      }
      else
      {
        this.title = '';
        this.getCurso();
        this.getAllProductos();
        this.getAllInstructoresCurso();
        this.cargarDataAlFormulario();
      }
    });
    
    this.changeValuesCursoForm();
  }

  buildForm()
  {
    this.cursoForm = this._formBuilder.group({
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      horaFin: ['', Validators.required],
      sede: ['', Validators.required],
      instructor1: ['', Validators.required],
      instructor2: ['', Validators.required],
      producto: ['', Validators.required],
    });
  }

  async getCurso()
  {
    await this._cursoService.getCurso(this.idCurso).toPromise()
    .then(
      response => {
        console.log(response);
        this.curso = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getAllInstructoresCurso()
  {
    await this._cursoService.getAllInstructoresCurso().toPromise()
    .then(
      response => {
        console.log(response);
        this.instructores = response.data;

        //Carga los datos al formulario si se elige editar el Curso
        if (this.idCurso != undefined)
        {
          this.cargarDataAlFormulario();
        }

        this.loading = false;
      }
    )
    .catch(
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  async getAllProductos()
  {
    await this._pagosService.getAllProductos().toPromise()
    .then(
      response => {
        console.log(response);
        this.productos = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  cargarDataAlFormulario()
  {
    this.cursoForm.patchValue({
      descripcion: this.curso.descripcion,
      fechaInicio: this.curso.fechaInicio,
      horaInicio: this.curso.horaInicio,
      fechaFin: this.curso.fechaFin,
      horaFin: this.curso.horaFin,
      sede: this.curso.sede,
      instructor1: this.curso.idInstructor1,
      instructor2: this.curso.idInstructor2,
      producto: this.curso.idProducto
    });
  }

  //Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    //Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  //Muestra una previsualizacion de la imagen seleccionada localmente del input file
  onFileInput(event:any) 
  {
    if (event.target.files && event.target.files[0])
    {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imgUri = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveCurso()
  {  
    if (this.cursoForm.invalid || this.errorRangoFechas || this.errorRangoHoras) 
    {
      Object.values(this.cursoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    //Datos a enviar a la API
    this.curso.descripcion = this.cursoForm.value.descripcion;
    this.curso.fechaInicio = this.cursoForm.value.fechaInicio;
    this.curso.horaInicio = this.cursoForm.value.horaInicio;
    this.curso.fechaFin = this.cursoForm.value.fechaFin;
    this.curso.horaFin = this.cursoForm.value.horaFin;
    this.curso.sede = this.cursoForm.value.sede;
    this.curso.idInstructor1 = this.cursoForm.value.instructor1;
    this.curso.idInstructor2 = this.cursoForm.value.instructor2;
    this.curso.idProducto = this.cursoForm.value.producto;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    if (this.curso.idCurso)
    {
      this._cursoService.updateCurso(this.curso).subscribe(
        response => {
          console.log(response);
          if (response.success == true)
          {
            Swal.fire({
              icon: 'success',
              title: 'Datos guardados correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1'
            });
          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1'
            });
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar los datos',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1'
          });
        }
      );
    }
    else
    {
      this._cursoService.createCurso(this.curso).subscribe(
        response => {
          console.log(response);
          if (response.success == true)
          {
            //Cierra el modal y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
            this.dialogRef.close({ statusResponse: response.success });
            Swal.fire({
              icon: 'success',
              title: 'Datos guardados correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1'
            });
          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1'
            });
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar los datos',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1'
          });
        }
      );
    }
  }

  changeValuesCursoForm()
  {
    this.cursoForm.valueChanges.subscribe(value => {
      if (value.fechaInicio > value.fechaFin && (value.fechaInicio != '' && value.fechaFin != ''))
      {
        this.errorRangoFechas = true;
      }
      else
      {
        this.errorRangoFechas = false;
      }

      if (value.horaInicio > value.horaFin && (value.horaInicio != '' && value.horaFin != ''))
      {
        this.errorRangoHoras = true;
      }
      else
      {
        this.errorRangoHoras = false;
      }
    });
  }

  /* ************************************************************************************* */
  //Validaciones para el formulario
  get descripcionNoValido()
  {
    return this.cursoForm.get('descripcion').invalid && this.cursoForm.get('descripcion').touched;
  }

  get fechaInicioNoValido()
  {
    return this.cursoForm.get('fechaInicio').invalid && this.cursoForm.get('fechaInicio').touched;
  }

  get horaInicioNoValido()
  {
    return this.cursoForm.get('horaInicio').invalid && this.cursoForm.get('horaInicio').touched;
  }

  get fechaFinNoValido()
  {
    return this.cursoForm.get('fechaFin').invalid && this.cursoForm.get('fechaFin').touched;
  }

  get horaFinNoValido()
  {
    return this.cursoForm.get('horaFin').invalid && this.cursoForm.get('horaFin').touched;
  }

  get sedeNoValido()
  {
    return this.cursoForm.get('sede').invalid && this.cursoForm.get('sede').touched;
  }

  get instructor1NoValido()
  {
    return this.cursoForm.get('instructor1').invalid && this.cursoForm.get('instructor1').touched;
  }

  get instructor2NoValido()
  {
    return this.cursoForm.get('instructor2').invalid && this.cursoForm.get('instructor2').touched;
  }

  get productoNoValido()
  {
    return this.cursoForm.get('producto').invalid && this.cursoForm.get('producto').touched;
  }

}
