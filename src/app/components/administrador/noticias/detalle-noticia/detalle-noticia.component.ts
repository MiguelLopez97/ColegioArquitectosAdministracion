import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NoticiaModel } from '../../../../models/noticia.model';
import { AsociacionService } from '../../../../services/asociacion.service';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss']
})
export class DetalleNoticiaComponent implements OnInit {

  public noticia = new NoticiaModel();
  public loading: boolean = false;

  constructor(
    private _asociacionService: AsociacionService,
    public dialogRef: MatDialogRef<DetalleNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el idNoticia de la tabla donde se abre el modal de Angular Material
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getNoticia();
  }

  //Cierra el modal de Angular Material
  closeDialog(): void 
  {
    this.dialogRef.close();
  }

  getNoticia()
  {
    this._asociacionService.getNoticia(this.data.idNoticia).subscribe(
      response => {
        console.log(response);
        this.noticia = response.data;
        this.noticia.cuerpo = '<div class="col-12">' + this.noticia.cuerpo + '</div>'
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

}
