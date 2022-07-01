import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-factores-uso',
  templateUrl: './table-factores-uso.component.html',
  styleUrls: ['./table-factores-uso.component.scss']
})
export class TableFactoresUsoComponent implements OnInit {

  public tipoUso = [
    {uso: 'VIVIENDA UNIFAMILIAR'},
    {uso: 'VIVENDA MULTIFAMILIAR PLURIFAMILIAR O CONJUNTOS'},
    {uso: 'EDIFICIOS COMERCIALES O MIXTOS'},
    {uso: 'HOTEL ZONA URBANA'},
    {uso: 'ZONA INDUSTRIAL'},
    {uso: 'EDIFICIOS PÚBLICOS'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
