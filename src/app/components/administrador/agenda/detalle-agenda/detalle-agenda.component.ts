import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AgendaModel } from '../../../..//models/agenda.model';
import { AsociacionService } from '../../../../services/asociacion.service';
import { PagosService } from '../../../../services/pagos.service';

@Component({
  selector: 'app-detalle-agenda',
  templateUrl: './detalle-agenda.component.html',
  styleUrls: ['./detalle-agenda.component.scss'],
})
export class DetalleAgendaComponent implements OnInit {
  public agenda = new AgendaModel();
  public productos: any[] = [];
  public producto: string; //Propiedad para almacenar el nombre del producto
  public loading: boolean = false;

  constructor(
    private _asociacionService: AsociacionService,
    private _pagosService: PagosService,
    public dialogRef: MatDialogRef<DetalleAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data //Recibe el idAgenda de la tabla donde se abre el modal de Angular Material
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getAgenda();
  }

  //Cierra el modal de Angular Material
  closeDialog(): void {
    this.dialogRef.close();
  }

  getAgenda() {
    this.getProductosActivos();
    this._asociacionService.getAgenda(this.data.idAgenda).subscribe(
      (response) => {
        console.log(response);
        this.agenda = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  //Obtiene todos los productos activos y los almacena en un arreglo
  getProductosActivos() {
    this._pagosService.getAllProductos().subscribe(
      (response) => {
        this.productos = response.data;
        //Realiza una búsqueda en el arreglo en base al idProducto que viene de la 'data' del modal
        //Una vez encontrado el nombre de la descripción, se almacena en la propiedad 'producto' para mostrarlo en 'Detalles'
        this.producto = this.productos.find((result) => result.idProducto == this.data.idProducto).descripcion;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
