import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; //Importaciones para el modal

import { SocioService } from '../../../../services/socio.service';
import { SocioModel } from '../../../../models/socio.model';

@Component({
  selector: 'app-table-socios',
  templateUrl: './table-socios.component.html',
  styleUrls: ['./table-socios.component.scss'],
  providers: [NgbModal, NgbActiveModal]
})
export class TableSociosComponent implements OnInit {

  /*public socios = [
    {codigo: '1', aPaterno: 'Aldana', aMaterno: 'López', nombre: 'Miguel Alejandro', DRO: '255', CDA: '235', telefono: '9931525253', email: 'aldana@gmail.com'},
    {codigo: '2', aPaterno: 'Cid', aMaterno: 'Moscoso', nombre: 'Luis Javier', DRO: '999', CDA: '999', telefono: '9933476895', email: 'cid.arq.360@hotmail.com'},
  ];*/

  public socios: SocioModel[];

  constructor(
    private _socioService: SocioService,
    private modalService: NgbModal, //Modal
    public activeModal: NgbActiveModal //Modal
  ) { }

  ngOnInit() {
    this.getAllSocios();
  }

  //Método para abrir el modal
  open(content) 
  {
    this.modalService.open(content);
  }

  getAllSocios()
  {
    /*this._socioService.getAllSocios().subscribe(
      response => {
        console.log(response);
        this.socios = response.data;
      },
      error => {
        console.log(error);
      }
    );*/
  }

}
