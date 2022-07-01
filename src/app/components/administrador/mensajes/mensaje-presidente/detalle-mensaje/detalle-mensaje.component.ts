import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MensajePresidente } from 'app/models/mensaje-presidente.model';

@Component({
  selector: 'app-detalle-mensaje',
  templateUrl: './detalle-mensaje.component.html',
  styleUrls: ['./detalle-mensaje.component.scss'],
})
export class DetalleMensajeComponent implements OnInit {
  public mensaje: MensajePresidente = new MensajePresidente();
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DetalleMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el objeto con los datos del mensaje de la tabla donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.mensaje = this.data.data;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
