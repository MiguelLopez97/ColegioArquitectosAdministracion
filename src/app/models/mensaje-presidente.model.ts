export class MensajePresidente {
  public idMensaje: number;
  public idTipoComunicacion: number;
  public mensaje: string;
  public vigenteDesde: Date;
  public vigenteHasta: Date;
  public contacto: string;
  public telefono: string;

  constructor() {}
}

export class RequestMensajePresidente {
  public idComunicacion: number;
  public idTipoComunicacion: number;
  public mensaje: string;
  public vigenteDesde: Date;
  public vigenteHasta: Date;
  public contacto: string;
  public telefono: string;

  constructor() {}
}
