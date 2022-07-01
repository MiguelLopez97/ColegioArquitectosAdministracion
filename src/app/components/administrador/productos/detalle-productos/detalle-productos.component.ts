import { Component, Inject, OnInit } from '@angular/core';
import { ProductoModel } from 'app/models/producto.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.scss'],
})
export class DetalleProductosComponent implements OnInit {
  public producto = new ProductoModel();
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DetalleProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data // Recibe los datos del producto del tabla donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    this.producto = this.data;
    this.loading = false;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
