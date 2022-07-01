import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material

import { CursoService } from '../../../../services/curso.service';
import { ParticipanteCursoModel } from '../../../../models/curso.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-participante',
  templateUrl: './form-participante.component.html',
  styleUrls: ['./form-participante.component.scss']
})
export class FormParticipanteComponent implements OnInit {

  public loading = true;

  public participante = new ParticipanteCursoModel();

  constructor(
    public dialogRef: MatDialogRef<FormParticipanteComponent>,
    private _cursoService: CursoService,
    @Inject(MAT_DIALOG_DATA) public data //Recibe los datos del componente desde el icono 'Editar' de la tabla 'Participantes'
  ) { }

  ngOnInit() {
    this.getParticipante();
  }

  //Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    //Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  getParticipante()
  {
    this._cursoService.getParticipante(this.data.idCursoParticipante).subscribe(
      response => {
        console.log(response);
        this.participante = response.data;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  saveParticipanteCurso(form: NgForm)
  {
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

    this._cursoService.updateParticipante(this.participante).subscribe(
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

}
