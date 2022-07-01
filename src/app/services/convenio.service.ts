import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Global } from './global';
import { ResponseModel } from 'app/models/response.model';
import { ConvenioModel, LogoConvenio, TipoConvenio } from 'app/models/convenio.model';

@Injectable({
  providedIn: 'root',
})
export class ConvenioService {
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = Global.baseUrl;
  }

  //#region "Convenio"

  getTiposConvenios(): TipoConvenio[] {
    return TIPOS_CONVENIOS;
  }

  getConvenios(): Observable<ResponseModel<ConvenioModel[]>> {
    return this._http.get<ResponseModel<ConvenioModel[]>>(`${this.apiUrl}/Convenio`);
  }

  getConvenioById(id: number): Observable<ResponseModel<ConvenioModel>> {
    return this._http.get<ResponseModel<ConvenioModel>>(`${this.apiUrl}/Convenio/${id}`);
  }

  saveLogoConvenio(request: LogoConvenio): Observable<ResponseModel<ConvenioModel>> {
    return this._http.post<ResponseModel<ConvenioModel>>(`${this.apiUrl}/Convenio/Logo`, request);
  }

  saveConvenio(request: ConvenioModel): Observable<ResponseModel<ConvenioModel>> {
    return this._http.post<ResponseModel<ConvenioModel>>(`${this.apiUrl}/Convenio`, request);
  }

  updateConvenio(request: ConvenioModel): Observable<ResponseModel<ConvenioModel>> {
    return this._http.put<ResponseModel<ConvenioModel>>(`${this.apiUrl}/Convenio`, request);
  }

  deleteConvenio(id: number): Observable<ResponseModel<ConvenioModel>> {
    return this._http.delete<ResponseModel<ConvenioModel>>(`${this.apiUrl}/Convenio?idConvenio=${id}`);
  }

  //#endregion

  //#region "Patrocinadores"

  getPatrocinadores(): Observable<ResponseModel<ConvenioModel[]>> {
    return this._http.get<ResponseModel<ConvenioModel[]>>(`${this.apiUrl}/Convenio/Patrocinadores`);
  }

  savePatrocinador(request: ConvenioModel): Observable<ResponseModel<ConvenioModel>> {
    return this._http.post<ResponseModel<ConvenioModel>>(`${this.apiUrl}/Convenio/Patrocinadores`, request);
  }

  updatePatrocinador(request: ConvenioModel): Observable<ResponseModel<ConvenioModel>> {
    return this._http.put<ResponseModel<ConvenioModel>>(`${this.apiUrl}/Convenio/Patrocinadores`, request);
  }

  //#endregion
}

export const TIPOS_CONVENIOS: TipoConvenio[] = [
  { idTipoConvenio: 1, tipoConvenio: 'Comercial' },
  { idTipoConvenio: 2, tipoConvenio: 'Académico' },
  { idTipoConvenio: 3, tipoConvenio: 'Institucional' },
  { idTipoConvenio: 4, tipoConvenio: 'Patrocinador' },
  { idTipoConvenio: 5, tipoConvenio: 'Patrocinador con Convenio' },
];
