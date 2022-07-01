import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //Importacion para recibir el valor que viene del modal de Angular Material

import { CursoService } from '../../../../services/curso.service';
import { EspecialidadCursoModel } from '../../../../models/curso.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-especialidad',
  templateUrl: './form-especialidad.component.html',
  styleUrls: ['./form-especialidad.component.scss']
})
export class FormEspecialidadComponent implements OnInit {

  public titulo: string;
  public loading = true;

  public catalogoEspecialidades: any[] = [];
  public especialidad = new EspecialidadCursoModel();

  constructor(
    public dialogRef: MatDialogRef<FormEspecialidadComponent>,
    private _cursoService: CursoService,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el dato del componente donde se abre el modal de Angular Material
  ) { }

  ngOnInit() {
    if (this.data.idCurso == null)
    {
      this.titulo = "Agregar especialidad";
      this.getCatalogoEspecialidades();
    }
    else
    {
      this.titulo = "Editar especialidad";
      this.getEspecialidadCurso();
      this.getCatalogoEspecialidades();
    }
  }

  //Cierra el modal de Angular Material al dar click en el botón Cancelar
  closeDialog(): void {
    //Se agrega el parámetro 'statusResponse' para que no marque error al dar click en el botón 'Cancelar' del formulario
    this.dialogRef.close({ statusResponse: false });
  }

  async getEspecialidadCurso()
  {
    await this._cursoService.getEspecialidad(this.data.idCurso).toPromise()
    .then(
      response => {
        console.log(response);
        this.especialidad = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getCatalogoEspecialidades()
  {
    await this._cursoService.getEspecialidades().toPromise()
    .then(
      response => {
        //console.log(response);
        this.catalogoEspecialidades = response.data;
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

  saveEspecialidadCurso(form: NgForm)
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

    //Buscamos en el arreglo 'catalogoEspecialidades' el nombre de la especialidad en base al 'idEspecialidadSocio' seleccionado
    this.especialidad.nombre = this.catalogoEspecialidades.find(element => element.idEspecialidadSocio == this.especialidad.idEspecialidadSocio).nombreCorto;

    if (!this.especialidad.idCursoEspecialidad)
    {
      this._cursoService.createEspecialidad(this.especialidad).subscribe(
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
              confirmButtonColor: '#2054A1',
            });
          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
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
            title: 'Error al guardar los datos',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      );
    }
    else
    {
      this._cursoService.updateEspecialidad(this.especialidad).subscribe(
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

}
