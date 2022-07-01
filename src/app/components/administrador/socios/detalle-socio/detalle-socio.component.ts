import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SocioService } from '../../../../services/socio.service';
import { SocioModel } from '../../../../models/socio.model';
import { RequisitoModel } from '../../../../models/requisito.mode';

@Component({
  selector: 'app-detalle-socio',
  templateUrl: './detalle-socio.component.html',
  styleUrls: ['./detalle-socio.component.scss'],
})
export class DetalleSocioComponent implements OnInit {
  public socio = new SocioModel();
  public requisitos: RequisitoModel[] = [];
  public loading: boolean = false;

  constructor(
    private _socioService: SocioService,
    public dialogRef: MatDialogRef<DetalleSocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el iSocio de la tabla donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getSocio();
    this.getRequisitos();
  }

  //Cierra el modal de Angular Material
  closeDialog(): void {
    this.dialogRef.close();
  }

  getSocio() {
    this._socioService.getSocio(this.data.idSocio).subscribe(
      (response) => {
        console.log(response);
        this.socio = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getRequisitos() {
    this._socioService.getFilesRequisitos(this.data.idSocio).subscribe(
      (response) => {
        console.log(response);
        this.requisitos = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
