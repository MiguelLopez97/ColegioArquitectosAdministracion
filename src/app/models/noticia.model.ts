export class NoticiaModel {
  public idNoticia: number;
  public titulo: string;
  public resumen: string;
  public cuerpo: string;
  public imagen: string;
  public video: string;
  public archivo: string;
  public archivado: boolean;
  public fechaRegistro: any;

  constructor() {}
}

export class NoticiaArchivoModel {
  public idNoticia: number;
  public archivo: string;
  public tipoArchivo: string; // VID | IMG
  public fileContentBase64: string;
  public fileName: string;
  public fileExt: string;
  public fileArray: string;
  public fileIsForBody: boolean;

  constructor() {}
}
