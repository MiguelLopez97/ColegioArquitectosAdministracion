import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Global } from './global';
import { NoticiaModel, NoticiaArchivoModel } from '../models/noticia.model';
import { AgendaFlyerModel, AgendaModel } from '../models/agenda.model';
import { NormatecaModel, NormatecaArchivoModel } from '../models/normateca.model';
import { SolicitudModel } from '../models/solicitud.model';
import { SlideModel } from '../models/slide.model';
import { RequestMensajePresidente } from 'app/models/mensaje-presidente.model';

@Injectable({
  providedIn: 'root',
})
export class AsociacionService {
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = Global.baseUrl;
  }

  //Agenda
  getAgenda(idAgenda): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Agenda/' + idAgenda);
  }

  getAllAgendas(): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Agenda');
  }

  async createAgenda(agenda: AgendaModel) {
    return await this._http.post(this.apiUrl + '/Asociacion/Agenda', agenda).toPromise();
  }

  async updateAgenda(agenda: AgendaModel) {
    const body = {
      ...agenda,
    };
    return await this._http.put(this.apiUrl + '/Asociacion/Agenda', body).toPromise();
  }

  async saveFlyer(archivo: AgendaFlyerModel) {
    return await this._http.post(`${this.apiUrl}/Asociacion/Agenda/Flyer`, archivo).toPromise();
  }

  deleteAgenda(idAgenda): Observable<any> {
    return this._http.delete(this.apiUrl + '/Asociacion/Agenda/' + idAgenda);
  }

  getTiposDeEvento(): Observable<any> {
    return this._http.get(`${this.apiUrl}/Asociacion/Agenda/TiposDeEvento`);
  }

  //Normateca
  getNormateca(idNormateca): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Normateca/' + idNormateca);
  }

  getAllNormateca(): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Normateca');
  }

  async createNormateca(normateca: NormatecaModel) {
    return await this._http.post(this.apiUrl + '/Asociacion/Normateca', normateca).toPromise();
  }

  async updateNormateca(normateca: NormatecaModel) {
    const body = {
      ...normateca,
    };
    return await this._http.put(this.apiUrl + '/Asociacion/Normateca', body).toPromise();
  }

  async updateNormatecaArchivo(archivo: NormatecaArchivoModel) {
    const body = {
      ...archivo,
    };
    return await this._http.put(`${this.apiUrl}/Asociacion/Normateca/Archivo`, body).toPromise();
  }

  deleteNormateca(idNormateca): Observable<any> {
    return this._http.delete(this.apiUrl + '/Asociacion/Normateca/' + idNormateca);
  }

  //Noticias
  getAllNoticias(): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Noticias/All');
  }

  getNoticia(idNoticia): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Noticias/' + idNoticia);
  }

  async createNoticia(noticia: NoticiaModel) {
    return await this._http.post(this.apiUrl + '/Asociacion/Noticias', noticia).toPromise();
  }

  async updateNoticia(noticia: NoticiaModel) {
    const body = {
      ...noticia,
    };
    return await this._http.put(this.apiUrl + '/Asociacion/Noticias', body).toPromise();
  }

  async saveArchivoNoticia(archivo: NoticiaArchivoModel) {
    return await this._http.post(`${this.apiUrl}/Asociacion/Noticias/Archivo`, archivo).toPromise();
  }

  deleteNoticia(idNoticia: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Asociacion/Noticias/${idNoticia}`);
  }

  async archivarNoticia(idNoticia: number, state: boolean) {
    return await this._http.put(`${this.apiUrl}/Asociacion/Noticias/Archivar`, { idNoticia: idNoticia, archivar: state }).toPromise();
  }

  //Solicitudes
  getAllSolicitud(): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Solicitud');
  }

  getSolicitud(idSolicitud): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Solicitud/' + idSolicitud);
  }

  getHistorialSolicitudes(idTipoSolicitud, idEstatus, fechaInicio, fechaFin): Observable<any> {
    let params = '?IdTipoSolicitud=' + idTipoSolicitud + '&IdEstatusSolicitud=' + idEstatus + '&FechaInicio=' + fechaInicio + '&FechaFin=' + fechaFin;
    return this._http.get(this.apiUrl + '/Asociacion/Solicitud/Historial' + params);
  }

  createSolicitud(solicitud: SolicitudModel): Observable<any> {
    return this._http.post(this.apiUrl + '/Asociacion/Solicitud', solicitud);
  }

  //Slides
  getSlides(): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Slides');
  }

  getSlide(idSlide): Observable<any> {
    return this._http.get(this.apiUrl + '/Asociacion/Slides/' + idSlide);
  }

  createSlide(slideFile: SlideModel): Observable<any> {
    return this._http.post(this.apiUrl + '/Asociacion/Slides', slideFile);
  }

  updateSlide(slideFile: SlideModel): Observable<any> {
    const body = {
      ...slideFile,
    };
    return this._http.put(this.apiUrl + '/Asociacion/Slides', body);
  }

  deleteSlide(idSlide): Observable<any> {
    return this._http.delete(this.apiUrl + '/Asociacion/Slides/' + idSlide);
  }

  // Mensaje del Presidente
  getMensajes(): Observable<any> {
    return this._http.get(`${this.apiUrl}/Asociacion/Comunicacion/Mensajes`);
  }

  saveMensaje(mensaje: RequestMensajePresidente): Observable<any> {
    const body = {
      ...mensaje,
    };
    return this._http.post(`${this.apiUrl}/Asociacion/Comunicacion`, body);
  }

  updateMensaje(mensaje: RequestMensajePresidente): Observable<any> {
    const body = {
      ...mensaje,
    };
    return this._http.put(`${this.apiUrl}/Asociacion/Comunicacion`, body);
  }

  deleteMensaje(idMensaje: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Asociacion/Comunicacion/${idMensaje}`);
  }
}
