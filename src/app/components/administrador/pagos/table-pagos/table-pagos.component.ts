import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PagosService } from '../../../../services/pagos.service';
import { PagoModel } from '../../../../models/pago.model';
import { DetallePagoComponent } from '../detalle-pago/detalle-pago.component';

//Librería para convertir formatos de tipo Fecha
import * as moment from 'moment';

@Component({
  selector: 'app-table-pagos',
  templateUrl: './table-pagos.component.html',
  styleUrls: ['./table-pagos.component.scss'],
})
export class TablePagosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public productos: any[] = [];

  //Propiedades para el getHistorialPagos
  public fechaInicio: any = moment(new Date(new Date().getFullYear(), 0, 1, 1)).format('YYYY-MM-DD');
  public fechaFin: any = moment(new Date()).format('YYYY-MM-DD');
  public historialPagos: any[] = [];

  //Propiedades para la tabla de Angular Material
  public displayedColumns: string[] = ['folio', 'tipoPago', 'socio', 'producto', 'fechaPago', 'monto'];
  public dataSource = new MatTableDataSource<PagoModel>(this.historialPagos);

  //Propiedades para realizar validaciones en la vista
  public loadingHistorial: boolean = false;
  public showFirstMessage: boolean = true;
  public error: boolean = false;
  public errorMessage: string;

  constructor(private _pagosService: PagosService, private modalService: NgbModal, public dialog: MatDialog, public activeModal: NgbActiveModal) {
    //Labels para la paginación de la tabla
    // this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    // this.paginator._intl.previousPageLabel = 'Página anterior';
    // this.paginator._intl.nextPageLabel = 'Siguiente página';
    // this.paginator._intl.firstPageLabel = 'Primera página';
    // this.paginator._intl.lastPageLabel = 'Última página';
  }

  //Paginación para la tabla
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeGetHistorialPagos(event);
  }

  //Filtro de búsqueda para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {}

  //Abre el modal para visualizar detalles
  openDialogDetalles(pIdPago) {
    const dialogRef = this.dialog.open(DetallePagoComponent, {
      height: 'auto',
      width: '600px',
      data: { idPago: pIdPago }, //Mandamos el idPago al componente del Formulario para que pueda consultar a la API por el idNormateca
    });
  }

  //Método para abrir el modal
  openModal(content) {
    this.modalService.open(content);
  }

  convertDateInicio(fecha) {
    //Convierte el formato de fecha del datePicker de Angular Material
    this.fechaInicio = moment(fecha).format('YYYY-MM-DD');
  }

  convertDateFin(fecha) {
    //Convierte el formato de fecha del datePicker de Angular Material
    this.fechaFin = moment(fecha).format('YYYY-MM-DD');
  }

  changeGetHistorialPagos(event) {
    //Se establece el valor a false para que ya no se muestre el primer mensaje de 'Especificar las fechas'
    this.showFirstMessage = false;

    this.loadingHistorial = true;

    this._pagosService.getHistorialPagosAdmin(this.fechaInicio, this.fechaFin).subscribe(
      (response) => {
        console.log(response);
        this.dataSource.data = response.data;
        this.loadingHistorial = false;
        this.error = false;
      },
      (error) => {
        console.log(error);
        this.loadingHistorial = false;
        this.error = true;
        if (this.error == true) {
          this.dataSource.data = [];
        }
        this.errorMessage = error.error.message;
      }
    );
  }
}
