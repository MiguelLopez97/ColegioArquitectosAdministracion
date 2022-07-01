import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material

import { CursoService } from '../../../../services/curso.service';
import { DiaCursoModel } from '../../../../models/curso.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-dia',
  templateUrl: './form-dia.component.html',
  styleUrls: ['./form-dia.component.scss']
})
export class FormDiaComponent implements OnInit {

  public diaForm: FormGroup;
  public errorDiferenciaHoras: boolean;

  public loading: boolean = true;
  public dia = new DiaCursoModel();

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormDiaComponent>,
    private _cursoService: CursoService,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el dato del componente donde se abre el modal de Angular Material
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    this.getDiaCurso();
    this.changeHoraForm();
  }

  get horaInicioNoValido() {
    return this.diaForm.get('horaInicio').invalid && this.diaForm.get('horaInicio').touched;
  }

  get horaFinNoValido() {
    return this.diaForm.get('horaFin').invalid && this.diaForm.get('horaFin').touched;
  }

  buildForm()
  {
    this.diaForm = this._formBuilder.group({
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    });
  }

  getDiaCurso()
  {
    this._cursoService.getDiaCurso(this.data.idCursoDia).subscribe(
      response => {
        console.log(response);
        this.dia = response.data;
        if (response.success == true)
        {
          this.cargarDataAlFormulario();
        }
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  cargarDataAlFormulario()
  {
    this.diaForm.patchValue({
      horaInicio: this.dia.horaInicio,
      horaFin: this.dia.horaFin
    });
  }

  //Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    //Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  saveDiaCurso()
  {
    if (this.diaForm.invalid || this.errorDiferenciaHoras) {
      Object.values(this.diaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.dia.horaInicio = this.diaForm.value.horaInicio;
    this.dia.horaFin = this.diaForm.value.horaFin;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    this._cursoService.updateDiasCurso(this.dia).subscribe(
      response => {
        console.log(response);
        if (response.success == true)
        {
          //Cierra el modal y envia la propiedad 'statusResponse' con el valor de la respuesta (en este caso 'true')
          this.dialogRef.close({ statusResponse: response.success });
          Swal.fire({
            icon: 'success',
            title: 'Datos actualizados correctamente',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar los datos',
            text: response.firstError,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar los datos',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2054A1',
        });
      }
    );
  }

  changeHoraForm()
  {
    this.diaForm.valueChanges.subscribe(value => {
      console.log(value);
      if (value.horaInicio > value.horaFin)
      {
        this.errorDiferenciaHoras = true;
      }
      else
      {
        this.errorDiferenciaHoras = false;
      }
    });
  }

}
