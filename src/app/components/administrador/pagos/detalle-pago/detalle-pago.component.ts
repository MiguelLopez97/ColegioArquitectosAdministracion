import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PagosService } from 'app/services/pagos.service';
import { RegistroPagoModel, TipoPagoModel } from 'app/models/registro-pagos.model';
import { SocioService } from 'app/services/socio.service';
import { SocioModel } from 'app/models/socio.model';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.scss'],
})
export class DetallePagoComponent implements OnInit {
  public pago: RegistroPagoModel = new RegistroPagoModel();
  public tipoPago: TipoPagoModel = new TipoPagoModel();
  public socio: SocioModel = new SocioModel();
  public loading: boolean = false;

  constructor(
    private _pagoService: PagosService,
    private _socioService: SocioService,
    public dialogRef: MatDialogRef<DetallePagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el idPago de la tabla donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getPago();
  }

  // Cierra el modal de Angular Material
  closeDialog(): void {
    this.dialogRef.close();
  }

  getPago() {
    this._pagoService.getPagoById(this.data.idPago).subscribe(
      (response) => {
        console.log(response);
        this.pago = response.data;
        this.getTipoPago(this.pago.idTipoDePago);
        this.getSocio(this.pago.idSocio);
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getTipoPago(id: number) {
    this._pagoService.getTipoPago(id).subscribe(
      (response) => {
        console.log(response);
        this.tipoPago = response.data;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getSocio(id: number) {
    this._socioService.getSocio(id).subscribe(
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
}
