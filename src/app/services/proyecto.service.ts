import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Global } from './global';
import { ProyectoModel } from '../models/proyecto.model';
import { FileItem } from '../models/file-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {

  public apiUrl: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.apiUrl = Global.baseUrl;
  }

  getCategoriasProyecto():Observable<any>
  {
    return this._http.get(this.apiUrl + '/Proyecto/CategoriasProyecto');
  }

  getUsoDeObra():Observable<any>
  {
    return this._http.get(this.apiUrl + '/Proyecto/UsoDeObra');
  }

  getFactorCalidad():Observable<any>
  {
    return this._http.get(this.apiUrl + '/Proyecto/FactorCalidad');
  }

  getAllProyecto():Observable<any>
  {
    return this._http.get(this.apiUrl + '/Proyecto');
  }

  getProyectoSocio(idSocio):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Proyecto/Socio/' + idSocio);
  }

  getProyecto(idProyecto):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Proyecto/' + idProyecto);
  }

  createProyecto(proyecto: ProyectoModel):Observable<any>
  {
    return this._http.post(this.apiUrl + '/Proyecto', proyecto);
  }

  updateProyecto(proyecto: ProyectoModel):Observable<any>
  {
    const body = {
      ...proyecto
    }
    return this._http.put(this.apiUrl + '/Proyecto', body);
  }

  deleteProyecto(idProyecto):Observable<any>
  {
    const param = '?idProyecto=' + idProyecto
    return this._http.delete(this.apiUrl + '/Proyecto' + param);
  }

  getPhotos(idProyecto):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Proyecto/Photos/' + idProyecto);
  }

  uploadPhotos(imagenes):Observable<any>
  {
    return this._http.post(this.apiUrl + '/Proyecto/Photos/', imagenes);
  }

  deletePhotos(idFotografia):Observable<any>
  {
    return this._http.delete(this.apiUrl + '/Proyecto/Photos/' + idFotografia);
  }

  // Cotizaciones
  getAllCotizaciones(): Observable<any> {
    return this._http.get(`${this.apiUrl}/Proyecto/Cotizacion/All`);
  }

  getCotizacion(idCotizacion): Observable<any> {
    return this._http.get(`${this.apiUrl}/Proyecto/Cotizacion/${idCotizacion}`);
  }

  updateCotizacion(idCotizacion: number, idEstatus: number): Observable<any> {
    return this._http.put(`${this.apiUrl}/Proyecto/Cotizacion`,
      {
        idCotizacion: idCotizacion,
        idEstatus: idEstatus
      });
  }
}
