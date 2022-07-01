import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-factores-calidad',
  templateUrl: './form-factores-calidad.component.html',
  styleUrls: ['./form-factores-calidad.component.scss']
})
export class FormFactoresCalidadComponent implements OnInit {

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
