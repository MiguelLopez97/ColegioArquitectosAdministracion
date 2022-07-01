import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // Modal de Angular Material

import { ProyectoService } from 'app/services/proyecto.service';
import { CotizacionModel } from 'app/models/cotizacion.model';
import { DetalleCotizacionComponent } from './detalle-cotizacion/detalle-cotizacion.component';

@Component({
  selector: 'app-bandeja-cotizaciones',
  templateUrl: './bandeja-cotizaciones.component.html',
  styleUrls: ['./bandeja-cotizaciones.component.scss'],
})
export class BandejaCotizacionesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Propiedades para la tabla de Angular Material
  public cotizaciones: CotizacionModel[] = [];
  public loading: boolean = false;
  displayedColumns: string[] = [
    'folio',
    'obra',
    'autor',
    'ubicacion',
    'propietario',
    'fechaCreacion',
    // 'fechaAprobacion',
    'estatus',
    'opciones',
  ];
  dataSource = new MatTableDataSource<CotizacionModel>(this.cotizaciones); // El dataSource toma el valor del arreglo 'cotizaciones'

  constructor(private _proyectoService: ProyectoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loading = true;
    this.getAllCotizaciones();

    // Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = 'Registro por página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
  }

  // Paginación para la tabla
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filtro de búsqueda para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Abre el modal para visualizar detalles
  openDialogDetalles(pIdCotizacion) {
    const dialogRef = this.dialog.open(DetalleCotizacionComponent, {
      height: 'auto',
      width: '800px',
      data: { idCotizacion: pIdCotizacion }, // Mandamos el idCotizacion al componente del Detalles para que pueda consultar a la API por el id
    });

    dialogRef.afterClosed().subscribe((result) => {
      /**
       * Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
       * (Esto es para que haga el refresh de la tabla después de que se apruebe o rechace un registro)
       */
      if (result.statusResponse === true) {
        this.getAllCotizaciones();
      }
    });
  }

  getAllCotizaciones() {
    this._proyectoService.getAllCotizaciones().subscribe(
      (response: any) => {
        console.log(response);
        this.dataSource.data = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
