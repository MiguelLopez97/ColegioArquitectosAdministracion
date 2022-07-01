export class RegistroPagoModel {
  public idSocio: number;
  public idPago: number;
  public idTipoDePago: number;
  public tipoDePago: string;
  public idProducto: number;
  public producto: string;
  public folio: string;
  public monto: number;
  public fechaPago: string;
  public cotejado: boolean;

  constructor() {}
}

export class TipoPagoModel {
  public idTipoPago: number;
  public tipoPago: string;

  constructor() {}
}
