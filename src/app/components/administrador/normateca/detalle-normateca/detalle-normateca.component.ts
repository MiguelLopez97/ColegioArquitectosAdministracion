import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NormatecaModel } from 'app/models/normateca.model';
import { AsociacionService } from 'app/services/asociacion.service';

@Component({
  selector: 'app-detalle-normateca',
  templateUrl: './detalle-normateca.component.html',
  styleUrls: ['./detalle-normateca.component.scss'],
})
export class DetalleNormatecaComponent implements OnInit {
  public normateca = new NormatecaModel();
  public loading: boolean = false;

  constructor(
    private _asocacionService: AsociacionService,
    public dialogRef: MatDialogRef<DetalleNormatecaComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe el idNormateca de la tabla donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getNormateca();
  }

  // Cierra el modal de Angular Material
  closeDialog(): void {
    this.dialogRef.close();
  }

  getNormateca() {
    this._asocacionService.getNormateca(this.data.idNormateca).subscribe(
      (response) => {
        console.log(response);
        this.normateca = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
