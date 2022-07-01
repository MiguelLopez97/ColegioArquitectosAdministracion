import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  public routes = [
    { title: 'Mensajes del Presidente', url: 'mensajes-presidente', icon: 'fas fa-comment-alt' },
    { title: 'Notificaciones', url: 'notificaciones', icon: 'fas fa-bell' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
