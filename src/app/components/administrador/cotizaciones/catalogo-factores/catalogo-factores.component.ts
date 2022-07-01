import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo-factores',
  templateUrl: './catalogo-factores.component.html',
  styleUrls: ['./catalogo-factores.component.scss']
})
export class CatalogoFactoresComponent implements OnInit {

  public routes = [
    { title: 'Uso', url: './', icon: 'fas fa-building' },
    { title: 'Calidad', url: 'calidad', icon: 'fas fa-check-circle' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
