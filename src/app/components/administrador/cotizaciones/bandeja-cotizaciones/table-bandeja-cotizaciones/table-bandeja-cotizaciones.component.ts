import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; //Importaciones para el modal

@Component({
  selector: 'app-table-bandeja-cotizaciones',
  templateUrl: './table-bandeja-cotizaciones.component.html',
  styleUrls: ['./table-bandeja-cotizaciones.component.scss'],
  providers: [NgbModal, NgbActiveModal]
})
export class TableBandejaCotizacionesComponent implements OnInit {

  public cotizaciones = [
    {folio: '00001', socio: 'Arq. Juan Pérez López', obra: 'Obra 1', importe: '$12000', fechaSolicitud: '03 de marzo de 2020'},
    {folio: '00002', socio: 'Arq. Juan Pérez López', obra: 'Obra 2', importe: '$18000', fechaSolicitud: '04 de marzo de 2020'},
    {folio: '00003', socio: 'Arq. Mariana López López', obra: 'Obra 3', importe: '$23000', fechaSolicitud: '05 de marzo de 2020'}
  ];

  constructor(    
    private modalService: NgbModal, //Modal
    public activeModal: NgbActiveModal //Modal
  ) { }

  ngOnInit() {
  }

  //Método para abrir el modal
  open(content) 
  {
    this.modalService.open(content);
  }

}
