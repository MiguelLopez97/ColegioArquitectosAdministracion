// Sidebar route metadata
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu : RouteInfo[];
    userType: string; //Propiedad para definir el tipo de usuario para el Sidebar
    tooltip: string; //Propiedad para agregar un tooltip(mensaje de ayuda)
}
