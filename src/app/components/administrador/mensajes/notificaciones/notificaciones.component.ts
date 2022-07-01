import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  public socios = [
    {codigo: '1', aPaterno: '', aMaterno: '', nombre: 'Todos los socios', DRO: '255', CDA: '235', telefono: '9931525253', email: 'aldana@gmail.com'},
    {codigo: '1', aPaterno: 'Aldana', aMaterno: 'López', nombre: 'Miguel Alejandro', DRO: '255', CDA: '235', telefono: '9931525253', email: 'aldana@gmail.com'},
    {codigo: '2', aPaterno: 'Cid', aMaterno: 'Moscoso', nombre: 'Luis Javier', DRO: '999', CDA: '999', telefono: '9933476895', email: 'cid.arq.360@hotmail.com'},
  ];

  public mensajes = [
    {codigo: '1', mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris mollis, porta odio vitae, dictum nunc. In hendrerit tortor eu condimentum venenatis', desde: '12/12/2020', hasta: '31/12/2020'},
    {codigo: '2', mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae mauris mollis, porta odio vitae, dictum nunc. In hendrerit tortor eu condimentum venenatis', desde: '01/10/2020', hasta: '15/10/2020'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
