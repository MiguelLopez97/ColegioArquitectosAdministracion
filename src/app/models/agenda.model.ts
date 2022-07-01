export class AgendaModel {
  public idAgenda: number;
  public idTipo: number;
  public idProducto: number;
  public descripcion: string;
  public organizador: string;
  public contacto: string;
  public telefono: string;
  public correo: string;
  public horario: string;
  public costoSocio: number;
  public costoEstudiante: number;
  public costoPublico: number;
  public fechaInicio: Date;
  public fechaFin: Date;
  public flyer: string;
  public activo: boolean;

  constructor() {}
}

export class AgendaFlyerModel {
  public idAgenda: number;
  public flyer: string;
  public tipoArchivo: string; // VID | IMG
  public fileContentBase64: string;
  public fileName: string;
  public fileExt: string;
  public fileArray: string;

  constructor() {}
}
