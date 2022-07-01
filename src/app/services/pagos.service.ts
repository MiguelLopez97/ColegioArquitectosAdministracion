import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Global } from './global';

import { PagoModel } from '../models/pago.model';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  public apiUrl: string;

  constructor(private _http: HttpClient) {
    this.apiUrl = Global.baseUrl;
  }

  // ---------------------------------------------------------------------------
  // Productos
  // ---------------------------------------------------------------------------

  getProductosActivos(idSocio: number): Observable<any> {
    return this._http.get(`${this.apiUrl}/Pagos/Productos/Activos?IdSocio=${idSocio}`);
  }

  getAllProductos(): Observable<any> {
    return this._http.get(this.apiUrl + '/Pagos/Productos/Todos');
  }

  saveProducto(producto: ProductoModel): Observable<any> {
    return this._http.post(`${this.apiUrl}/Pagos/Productos`, producto);
  }

  updateProducto(producto: ProductoModel): Observable<any> {
    return this._http.put(`${this.apiUrl}/Pagos/Productos`, producto);
  }

  deleteProducto(idProducto: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Pagos/Productos?Id=${idProducto}`);
  }

  // ---------------------------------------------------------------------------
  // Pagos
  // ---------------------------------------------------------------------------

  getHistorialPagosSocio(idSocio): Observable<any> {
    return this._http.get(this.apiUrl + '/Pagos/Historial/Socio/' + idSocio);
  }

  createPago(pago: PagoModel): Observable<any> {
    return this._http.post(this.apiUrl + '/Pagos', pago);
  }

  updatePago(pago: PagoModel): Observable<any> {
    return this._http.put(`${this.apiUrl}/Pagos`, pago);
  }

  deletePago(idPago: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Pagos?idProyecto=${idPago}`);
  }

  getHistorialPagosAdmin(fechaInicio, fechaFin): Observable<any> {
    const params = '?FechaInicio=' + fechaInicio + '&FechaFin=' + fechaFin;
    return this._http.get(this.apiUrl + '/Pagos/Historial' + params);
  }

  getPagoById(idPago: number): Observable<any> {
    return this._http.get(`${this.apiUrl}/Pagos/${idPago}`);
  }

  getAllTiposPago(): Observable<any> {
    return this._http.get(`${this.apiUrl}/Pagos/TiposDePago`);
  }

  getTipoPago(id: number): Observable<any> {
    return this._http.get(`${this.apiUrl}/Pagos/TiposDePago/${id}`);
  }
}
