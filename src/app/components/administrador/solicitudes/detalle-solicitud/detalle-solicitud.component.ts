import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AsociacionService } from '../../../../services/asociacion.service';
import { SolicitudModel } from '../../../../models/solicitud.model';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.scss']
})
export class DetalleSolicitudComponent implements OnInit {

  public solicitud = new SolicitudModel();
  public tiposSolicitudes: any[] = [];
  public nombreTipoSolicitud: string;
  public loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DetalleSolicitudComponent>,
    private _asociacionService: AsociacionService,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el 'idSolicitud' de la tabla donde se abre el modal de Angular Material
  ) { }

  ngOnInit() {
    this.getAllTipoSolicitudes();
    this.getSolicitud();
  }

  async getAllTipoSolicitudes()
  {
    await this._asociacionService.getAllSolicitud().toPromise()
    .then(
      response => {
        // console.log(response);
        this.tiposSolicitudes = response.data;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  async getSolicitud()
  {
    await this._asociacionService.getSolicitud(this.data.idSolicitud).toPromise()
    .then(
      response => {
        console.log(response);
        this.solicitud = response.data;

        this.getNameTipoSolicitud(this.solicitud.idTipoSolicitud);

        this.loading = false;
      },
    )
    .catch(
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getNameTipoSolicitud(pIdTipoSolicitud)
  {
    const found = this.tiposSolicitudes.find(element => element.idTipoSolicitud == pIdTipoSolicitud);

    this.nombreTipoSolicitud = found.solicitud;
  }

}
