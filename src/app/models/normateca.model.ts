export class NormatecaModel {
  public idNormateca: number;
  public titulo: string;
  public archivo: string;
  public esURL: boolean;
  public tags: string;

  constructor() {}
}

export class NormatecaArchivoModel {
  public idNormateca: number;
  public archivo: string;
  public fileContentBase64: string;
  public fileName: string;
  public fileExt: string;
  public fileArray: string;

  constructor() {}
}
