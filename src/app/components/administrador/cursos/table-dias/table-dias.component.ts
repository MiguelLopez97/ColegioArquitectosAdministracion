import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { CursoService } from '../../../../services/curso.service';
import { FormDiaComponent } from '../form-dia/form-dia.component';

@Component({
  selector: 'app-table-dias',
  templateUrl: './table-dias.component.html',
  styleUrls: ['./table-dias.component.scss']
})
export class TableDiasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Propiedades para la tabla de Angular Material
  public loading: boolean = true;
  public displayedColumns: string[] = ['fecha', 'horaInicio', 'horaFin', 'opciones'];
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _cursoService: CursoService
  ) { }

  ngOnInit() {
    this.getAllDiasCurso();

    //Labels para la paginación de la tabla
    this.paginator._intl.itemsPerPageLabel = "Registros por página";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.paginator._intl.nextPageLabel = "Siguiente página";
    this.paginator._intl.firstPageLabel = "Primera página";
    this.paginator._intl.lastPageLabel = "Última página";
  }

  //Paginación y Ordenamiento para la tabla
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

  getAllDiasCurso()
  {
    this._route.params.subscribe(params => {
      this._cursoService.getAllDiasCurso(params['idCurso']).subscribe(
        response => {
          console.log(response);
          this.dataSource.data = response.data;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    });
  }

  //Abre el modal del formulario de Especialidad
  openDialog(pIdCursoDia, pFecha) 
  {
    const dialogRef = this.dialog.open(FormDiaComponent, {
      height: 'auto',
      width: '800px',
      data: {idCursoDia: pIdCursoDia, fecha: pFecha}, //Mandamos el idCursoDia y Fecha al componente del Formulario para que pueda consultar a la API por el idCursoDia
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //Recibe la propiedad 'statusResponse' cuando se cierra el modal de Angular Material
      //(Esto es para que haga el refresh de la tabla después de que se agregue o actualice un registro)
      if (result == undefined)
      {
        return;
      }
      else if (result.statusResponse == true)
      {
        this.getAllDiasCurso();
      }
    });
  }

}
