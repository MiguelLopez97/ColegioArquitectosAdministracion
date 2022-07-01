import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Global } from './global';
import { CursoModel, DiaCursoModel, ParticipanteCursoModel, EspecialidadCursoModel } from '../models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = Global.baseUrl;
  }

  getAllCursos():Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso');
  }

  getCurso(idCurso):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/' + idCurso);
  }

  createCurso(curso: CursoModel):Observable<any>
  {
    return this._http.post(this.apiUrl + '/Curso', curso);
  }

  updateCurso(curso: CursoModel):Observable<any>
  {
    const body = {
      ...curso
    }
    return this._http.put(this.apiUrl + '/Curso', body);
  }

  deleteCurso(idCurso):Observable<any>
  {
    const param = '?idCurso=' + idCurso;
    return this._http.delete(this.apiUrl + '/Curso' + param);
  }

  //Instructor
  getAllInstructoresCurso():Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/Instructor');
  }

  //Días
  getAllDiasCurso(idCurso):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/CursoDias/All/' + idCurso);
  }

  getDiaCurso(idCursoDia):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/CursoDias/' + idCursoDia);
  }

  updateDiasCurso(curso: DiaCursoModel):Observable<any>
  {
    const body = {
      ...curso
    }
    return this._http.put(this.apiUrl + '/Curso/CursoDias', body);
  }

  //Participantes
  getAllParticipantesCurso(idCurso):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/Participante/All/' + idCurso);
  }

  getParticipante(idCursoParticipante):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/Participante/' + idCursoParticipante);
  }

  updateParticipante(participante: ParticipanteCursoModel):Observable<any>
  {
    const body = {
      ...participante
    }
    return this._http.put(this.apiUrl + '/Curso/Participante', body);
  }

  //Especialidades
  getEspecialidades():Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/Especialidades');
  }

  getAllEspecialidadCurso(idCurso):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/Especialidad/All/' + idCurso);
  }

  getEspecialidad(idEspecialidad):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso/Especialidad/' + idEspecialidad);
  }

  createEspecialidad(especialidad: EspecialidadCursoModel):Observable<any>
  {
    return this._http.post(this.apiUrl + '/Curso/Especialidad', especialidad);
  }

  updateEspecialidad(especialidad: EspecialidadCursoModel):Observable<any>
  {
    const body = {
      ...especialidad
    }
    return this._http.put(this.apiUrl + '/Curso/Especialidad', body);
  }

  deleteEspecialidad(idEspecialidad):Observable<any>
  {
    return this._http.delete(this.apiUrl + '/Curso/Especialidad/' + idEspecialidad);
  }

  //Asistencia
  getAsistenciaReporte(idCurso):Observable<any>
  {
    return this._http.get(this.apiUrl + '/Curso//Asistencia/' + idCurso + '/Reporte');
  }

}
