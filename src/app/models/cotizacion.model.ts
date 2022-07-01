export class CotizacionModel {
  public idCotizacion:    number;
  public idSocio:         number;
  public idUsoObra:       number;
  public idFactor:        number;
  public idEstatus:       number;
  public estatus:         string;
  public usoDeObra:       string;
  public factorCalidad:   string;
  public superficie:      number;
  public smv:             number;
  public valorFactor:     number;
  public arancelTotal:    number;
  public folio:           string;
  public obra:            string;
  public propietario:     string;
  public ubicacion:       string;
  public fechaCreacion:   string;
  public fechaAprobacion: string;
  public version:         number;
  public detalle: DetalleModel[];

  constructor() {}
}

export class DetalleModel {
  public idCotizacionDetalle: number;
  public idCotizacion:        number;
  public idCorresponsal:      number;
  public corresponsal:        string;
  public porcentajeArancel:   number;
  public porcentajeReal:      number;
  public montoReal:           number;
  public montoArancel:        number;
}

