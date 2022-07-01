export class SolicitudModel {
    public idSolicitud: number;
    public idSocio: number;
    public idTipoSolicitud: number;
    public folioPago: string;
    public notaSocio: string;
    public idProducto: number;
    public solicitud: string;
    public nombre: string;
    public aPaterno: string;
    public aMaterno: string;
    public estatus: string;
    public notaCAT: string;
    public fechaSolicitud: string;
    public fechaAtencion: string;
    public folio: string; //Propiedad para consulta de una solicitud
    
    constructor() { }
}