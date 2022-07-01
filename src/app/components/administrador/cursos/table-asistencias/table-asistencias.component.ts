import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { CursoService } from '../../../../services/curso.service';
import { GenerateExcelService } from '../../../../services/generate-excel.service';

@Component({
  selector: 'app-table-asistencias',
  templateUrl: './table-asistencias.component.html',
  styleUrls: ['./table-asistencias.component.scss']
})
export class TableAsistenciasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  //Propiedades para la tabla de Angular Material
  public loading = true;
  public columns: any[] = [];
  public displayedColumns: string[] = [];
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private _route: ActivatedRoute,
    private _cursoService: CursoService,
    private _generateExcelService: GenerateExcelService
  ) { }

  ngOnInit() {
    this.getReporteAsistencia();
  }

  getReporteAsistencia()
  {
    this._route.params.subscribe(params => {
      this._cursoService.getAsistenciaReporte(params['idCurso']).subscribe(
        response => {
          console.log(response);
          this.columns = response.data[0].data.columns;
          this.dataSource.data = response.data[0].data.rows;
          this.displayedColumns = this.columns.map(c => c.name);
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    });
  }

  generateExcel()
  {
    this._generateExcelService.exportAsExcelFile(this.dataSource.data, 'Reporte_CAT_Asistencia_Curso');
  }

}
