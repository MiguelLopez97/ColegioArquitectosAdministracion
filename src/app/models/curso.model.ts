export class CursoModel {
  public idCurso: number;
  public idProducto: number;
  public idInstructor1: number;
  public idInstructor2: number;
  public descripcion: string;
  public sede: string;
  public fechaInicio: string;
  public fechaFin: string;
  public horaInicio: string;
  public horaFin: string;

  constructor() {}
}

export class ParticipanteCursoModel {
  public idCursoParticipante: number;
  public idCurso: number;
  public idSocio: number;
  public pagado: boolean;
  public participante: string;
  public fechaRegistro: string;
  public fechaConstancia: string;
  public folioConstancia: string;

  constructor() {}
}

export class EspecialidadCursoModel {
  public idCurso: number;
  public idCursoEspecialidad: number;
  public idEspecialidadSocio: number;
  public nombre: string;
  public horas: number;

  constructor() {}
}

export class DiaCursoModel {
  public idCursoDia: number;
  public idCurso: number;
  public fecha: string;
  public horaInicio: string;
  public horaFin: string;

  constructor() {}
}