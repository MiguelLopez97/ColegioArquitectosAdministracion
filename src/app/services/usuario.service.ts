import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Global } from './global';
import { SocioModel } from '../models/socio.model';
import { UsuarioExterno } from 'app/models/convenio.model';
import { ResponseModel } from 'app/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = Global.baseUrl;
  }

  getSociosRegistrados(): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._http.get(this.apiUrl + '/Usuario', { headers: headers });
  }

  getAvatarUri(idUsuario): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const param = '?idUsuario=' + idUsuario;
    return this._http.get(this.apiUrl + '/Usuario/GetAvatarUri' + param, { headers: headers });
  }

  saveAvatar(img): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._http.post(this.apiUrl + '/Usuario/SaveAvatarFile', img, { headers: headers });
  }

  saveUsuario(usuario: SocioModel): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this._http.post(`${this.apiUrl}/Usuario`, usuario, { headers: headers });
  }

  saveUsuarioExterno(request: UsuarioExterno): Observable<ResponseModel<SocioModel>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._http.post<ResponseModel<SocioModel>>(`${this.apiUrl}/Usuario/Externo`, request, { headers: headers });
  }
}
