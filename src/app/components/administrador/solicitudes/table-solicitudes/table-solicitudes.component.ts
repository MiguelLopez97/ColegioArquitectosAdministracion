import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; //Modal de Angular Material

import { AsociacionService } from '../../../../services/asociacion.service';
import { DetalleSolicitudComponent } from '../detalle-solicitud/detalle-solicitud.component';

//Librería para convertir formatos de tipo Fecha
import * as moment from 'moment';

@Component({
  selector: 'app-table-solicitudes',
  templateUrl: './table-solicitudes.component.html',
  styleUrls: ['./table-solicitudes.component.scss']
})
export class TableSolicitudesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loading: boolean;
  public displayedColumns: string[] = ['folio', 'nombre', 'aPaterno', 'aMaterno', 'tipoSolicitud', 'estatus', 'fechaSolicitud', 'opciones'];
  public dataSource = new MatTableDataSource<any>();

  public tiposSolicitudes: any[] = [];
  public idTipoSolicitud: number = 0;

  public fechaInicio: string;
  public fechaFin: string;
  public errorFechas: boolean;
  public errorMessage: string;

  constructor(
    public dialog: MatDialog,
    private _asociacionService: AsociacionService
  ) { }

  ngOnInit() {
    this.getFechasMesActual();
    this.getAllTipoSolicitudes();
    this.getHistorialSolicitudes();

    //Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.paginator._intl.nextPageLabel = "Siguiente página";
    this.paginator._intl.firstPageLabel = "Primera página";
    this.paginator._intl.lastPageLabel = "Última página";
  }

  //Paginación para la tabla
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Filtro de búsqueda para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Abre el modal para visualizar detalles
  openDialogDetalles(pIdSolicitud)
  {
    const dialogRef = this.dialog.open(DetalleSolicitudComponent, {
      height: 'auto',
      width: '600px',
      data: {idSolicitud: pIdSolicitud}, //Mandamos el idSolicitud al componente del Detalles para que pueda consultar a la API por el idSolicitud
    });
  }

  getFechasMesActual()
  {
    const anio = new Date().getFullYear();
    const mes = new Date().getMonth() + 1;

    //Obtenemos el último día que tenga el mes actual
    const ultimoDiaMes = new Date(anio, mes, 0).getDate();

    if (mes < 10)
    {
      this.fechaInicio = anio + '-0' + mes + '-01';
      this.fechaFin = anio + '-0' + mes + '-' + ultimoDiaMes;
    }
    else
    {
      this.fechaInicio = anio + '-' + mes + '-01';
      this.fechaFin = anio + '-' + mes + '-' + ultimoDiaMes;
    }
  }

  convertFechaInicio(fecha) {
    //Convierte el formato de fecha del datePicker de Angular Material
    this.fechaInicio = moment(fecha).format('YYYY-MM-DD');
  }

  convertFechaFin(fecha)
  {
    //Convierte el formato de fecha del datePicker de Angular Material
    this.fechaFin = moment(fecha).format('YYYY-MM-DD');
  }

  getNameTipoSolicitud(pIdTipoSolicitud)
  {
    const found = this.tiposSolicitudes.find(element => element.idTipoSolicitud == pIdTipoSolicitud);

    return found.solicitud;
  }

  getHistorialSolicitudes(idTipoSolicitud?: number)
  {
    this.loading = true;

    //Si el 'idTipoSolicitud' es igual a 0
    if (this.idTipoSolicitud == 0)
    {
      //El valor del parámetro 'idTipoSolicitud' será null para que busque TODOS los registros existentes
      idTipoSolicitud = null;
    }
    else
    {
      //El 'idTipoSolicitud' será igual al valor que se esté seleccionando en el select 'Tipo de Solicitud'
      idTipoSolicitud = this.idTipoSolicitud;
    }
    
    this._asociacionService.getHistorialSolicitudes(idTipoSolicitud, null, this.fechaInicio, this.fechaFin).toPromise()
    .then(
      response => {
        // console.log(response);
        this.dataSource.data = response.data;
        this.errorFechas = false;
        this.loading = false;
      },
    )
    .catch(
      error => {
        console.log(error);
        this.dataSource.data = [];
        this.errorFechas = true;
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    );
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
}
