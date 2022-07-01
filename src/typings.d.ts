/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module 'quill';
declare module 'leaflet';
declare module 'perfect-scrollbar';
declare module 'screenfull';
declare module 'd3-shape';

//Variable para usar OpenPay (Pasarela de pago BBVA)
declare var OpenPay: any;
