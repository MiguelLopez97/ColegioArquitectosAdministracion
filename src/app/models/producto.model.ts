export class ProductoModel {
  public idProducto?: number;
  public idTipoEvento: number;
  public tipo?: string;
  public codigo: string;
  public descripcion: string;
  public precioSocio: number;
  public precioPublico: number;
  public precioEstudiante: number;
  public esActivo?: boolean;
  public vigencia: Date;
  public satUnidad: string = '0';
  public satClave: string = '0';
  public satieps: number = 0;
  public sativa: number = 0;
  public sativaRet: number = 0;

  constructor() {}
}
