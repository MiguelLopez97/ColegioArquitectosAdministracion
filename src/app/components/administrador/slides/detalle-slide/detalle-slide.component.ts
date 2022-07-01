import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AsociacionService } from '../../../../services/asociacion.service';
import { SlideModel } from '../../../../models/slide.model';

@Component({
  selector: 'app-detalle-slide',
  templateUrl: './detalle-slide.component.html',
  styleUrls: ['./detalle-slide.component.scss']
})
export class DetalleSlideComponent implements OnInit {

  public loading: boolean = false;
  public slide = new SlideModel();

  constructor(
    private _asociacionService: AsociacionService,
    public dialogRef: MatDialogRef<DetalleSlideComponent>,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el idSlide de la tabla donde se abre el modal de Angular Material
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getSlide();
  }

  getSlide()
  {
    this._asociacionService.getSlide(this.data.idSlide).subscribe(
      response => {
        console.log(response);
        this.slide = response.data;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

}