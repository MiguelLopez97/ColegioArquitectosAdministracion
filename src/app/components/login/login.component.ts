import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public correoElectronico: string;
  public contrasenia: string;

  //Año actual
  currentDate: Date = new Date();

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  // Funcion para iniciar sesión
  onSubmit(form: NgForm) 
  {
    if (form.invalid) {
      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
    
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title: 'Iniciando sesión',
      text: 'Un momento por favor'
    });
    Swal.showLoading();

    this._authService.login(this.correoElectronico, this.contrasenia).subscribe(
      (response: any) => {
        console.log(response);           
        Swal.close();
        //usertypeid = 1 (Socio)
        //usertypeid = 2 (Admin)
        if (response.usertypeid == 1)
        {
          this._router.navigate(['/datos/generales']);
        }
        else
        {
          this._router.navigate(['/slides']);
        }
      },
      error => {
        console.log(error);
        if (error.status == 500 || error.status == 400)
        {
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: 'Correo electrónico y/o contraseña no válidos',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: error.statusText,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }        
      }
    );
  }

}
