import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Global } from './global';
import { SocioModel } from '../models/socio.model';

@Injectable({
  providedIn: 'root',
})
export class SocioService {
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = Global.baseUrl;
  }

  getSociosAfiliados(): Observable<any> {
    return this._http.get(this.apiUrl + '/Socio/Afiliados');
  }

  getSocio(idSocio: number): Observable<any> {
    return this._http.get(`${this.apiUrl}/Socio/${idSocio}`);
  }

  getSociosEditables(): Observable<any> {
    return this._http.get(`${this.apiUrl}/Socio/Edicion`);
  }

  getSocioEdicion(idSocio): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._http.get(this.apiUrl + '/Socio/Edicion/' + idSocio, { headers: headers });
  }

  createSocio(socio: SocioModel): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this._http.post(this.apiUrl + '/Socio', socio, { headers: headers });
  }

  updateSocio(socio: SocioModel): Observable<any> {
    const body = {
      ...socio,
    };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this._http.put(this.apiUrl + '/Socio', body, { headers: headers });
  }

  deleteSocio(idSocio): Observable<any> {
    const param = '?idSocio=' + idSocio;
    return this._http.delete(this.apiUrl + '/Socio' + param);
  }

  getFilesRequisitos(idSocio): Observable<any> {
    return this._http.get(this.apiUrl + '/Socio/Requisito/Archivo/' + idSocio);
  }

  uploadFileRequisito(requisitoFile): Observable<any> {
    return this._http.post(this.apiUrl + '/Socio/Requisito/Archivo', requisitoFile);
  }

  getAllCertificacion(idSocio): Observable<any> {
    return this._http.get(this.apiUrl + '/Socio/Certificacion/All/' + idSocio);
  }

  uploadFileCertificacion(certificacionFile): Observable<any> {
    return this._http.post(this.apiUrl + '/Socio/Certificacion/Archivo', certificacionFile);
  }

  getAllColonias(codigoPostal): Observable<any> {
    return this._http.get(this.apiUrl + '/Socio/AllColonias/' + codigoPostal);
  }

  saveBaja(idSocio: number, motivoBaja: string) {
    return this._http.put(`${this.apiUrl}/Socio/Baja`, { idSocio, motivoBaja });
  }
}
