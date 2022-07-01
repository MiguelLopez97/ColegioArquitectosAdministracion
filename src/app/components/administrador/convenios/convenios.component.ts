import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // Modal de Angular Material

import Swal from 'sweetalert2';
import { ConvenioModel, UsuarioExterno } from 'app/models/convenio.model';
import { ConvenioService } from 'app/services/convenio.service';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.scss'],
})
export class ConveniosComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  newConvenio: boolean;
  registro: ConvenioModel = new ConvenioModel();
  minDate: Date = new Date();

  title: string;
  convenios: ConvenioModel[] = [];
  displayColumns: string[] = ['entidad', 'representante', 'contacto', 'correoElectronico', 'tipoConvenio'];
  dataSource = new MatTableDataSource<ConvenioModel>(this.convenios); // El dataSource toma el valor del arreglo 'convenios'

  @ViewChild('convenio') convenio: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _convenioService: ConvenioService, private _usuarioService: UsuarioService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loading = true;
    this.newConvenio = true;
    this.title = 'Agregar convenio';
    this.getAllConvenios();

    // Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Valida que las teclas pulsadas sean únicamente números
  validaNumeros(event) {
    if (event.charCode >= 47 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  getAllConvenios(): void {
    this._convenioService.getPatrocinadores().subscribe(
      (res) => {
        console.log('res getConvenios :>> ', res);
        this.dataSource.data = res.data;
        this.loading = false;
      },
      (error) => {
        console.log('error :>> ', error);
        this.loading = false;
      }
    );
  }

  async saveConvenio(form: NgForm) {
    console.log('form :>> ', form);
    if (form.invalid) return;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
    });
    Swal.showLoading();

    console.log('this.registro :>> ', this.registro);

    let responseCount = 0;
    this.registro.contacto = this.registro.representante;
    let idEmpresa: number = 0;

    await this._convenioService
      .savePatrocinador(this.registro)
      .toPromise()
      .then(
        (res) => {
          console.log('res :>> ', res);
          if (res.success) {
            responseCount++;
            idEmpresa = res.data.idConvenio;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: res.firstError,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        },
        (error) => {
          console.log('error :>> ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar los datos',
            text: error,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        }
      )
      .catch((error) => {
        console.log('error :>> ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar los datos',
          text: error,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#2054A1',
        });
      });

    const usuario: UsuarioExterno = {
      idRol: 5,
      idEmpresa: idEmpresa,
      nombre: this.registro.contacto,
      apellidoPat: this.registro.contacto,
      correoElectronico: this.registro.correoElectronico,
    };

    if (responseCount > 0) {
      await this._usuarioService
        .saveUsuarioExterno(usuario)
        .toPromise()
        .then(
          (res) => {
            if (res.success) responseCount++;
            else {
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                text: res.firstError,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2054A1',
              });
            }
          },
          (error) => {
            console.log('error :>> ', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar los datos',
              text: error,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          }
        )
        .catch((error) => {
          console.log('error :>> ', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar los datos',
            text: error,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#2054A1',
          });
        });
    }

    if (responseCount === 2) {
      this.newConvenio = true;
      form.resetForm();
      this.getAllConvenios();

      Swal.fire({
        icon: 'success',
        title: 'Datos guardados correctamente',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2054A1',
      });
    }
  }

  nuevoConvenio(form: NgForm) {
    this.title = 'Agregar nuevo convenio';
    this.newConvenio = true;
    this.registro = new ConvenioModel();
    form.resetForm();
  }

  deleteConvenio(idConvenio: number): void {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este registro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2054A1',
      cancelButtonColor: '#78797A',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Espere',
          text: 'Eliminando registro',
        });
        Swal.showLoading();

        this._convenioService.deleteConvenio(idConvenio).subscribe(
          (response: any) => {
            console.log(response);
            Swal.close();
            this.getAllConvenios();
            Swal.fire({
              icon: 'success',
              title: 'Registro eliminado correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#2054A1',
            });
          },
          (error) => {
            console.log('error :>> ', error);
          }
        );
      }
    });
  }
}
