import { Routes, RouterModule } from '@angular/router';

// Componentes para el sidebar 'Administrador'
import { BandejaCotizacionesComponent } from 'app/components/administrador/cotizaciones/bandeja-cotizaciones/bandeja-cotizaciones.component';
import { ProductosComponent } from 'app/components/administrador/productos/productos.component';
import { SociosComponent } from 'app/components/administrador/socios/socios.component';
import { PagosComponent } from 'app/components/administrador/pagos/pagos.component';
import { NotificacionesComponent } from 'app/components/administrador/mensajes/notificaciones/notificaciones.component';
import { MensajePresidenteComponent } from 'app/components/administrador/mensajes/mensaje-presidente/mensaje-presidente.component';
import { MensajesComponent } from 'app/components/administrador/mensajes/mensajes.component';
import { NoticiasComponent } from 'app/components/administrador/noticias/noticias.component';
import { AgendaComponent } from 'app/components/administrador/agenda/agenda.component';
import { NormatecaComponent } from 'app/components/administrador/normateca/normateca.component';
import { SlidesComponent } from 'app/components/administrador/slides/slides.component';
import { CursosComponent } from 'app/components/administrador/cursos/cursos.component';
import { EditarCursoComponent } from 'app/components/administrador/cursos/editar-curso/editar-curso.component';
import { ConveniosComponent } from 'app/components/administrador/convenios/convenios.component';
import { SolicitudesComponent } from 'app/components/administrador/solicitudes/solicitudes.component';

// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  // Rutas para usuario 'Administrador'
  { path: 'slides', component: SlidesComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/editar-curso/:idCurso', component: EditarCursoComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'socios', component: SociosComponent },
  { path: 'noticias', component: NoticiasComponent },
  {
    path: 'mensajes',
    component: MensajesComponent,
    children: [
      { path: 'mensajes-presidente', component: MensajePresidenteComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
    ],
  },
  { path: 'pagos', component: PagosComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'normateca', component: NormatecaComponent },
  { path: 'bandeja-cotizaciones', component: BandejaCotizacionesComponent },
  { path: 'convenios', component: ConveniosComponent }
];
