import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

// Angular Material Imports
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSlideToggleModule,
  MatMenuModule,
  MatExpansionModule,
  MatRadioModule,
  MatTabsModule,
  MatTreeModule,
  MatDatepickerModule,
  MatStepperModule,
  MatBadgeModule,
  MatTooltipModule,
  MatGridListModule,
  MatButtonToggleModule,
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

// Para cambiar la fecha a Español-México
import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
registerLocaleData(localeMX, 'es-Mx');

import { AngularFileUploaderModule } from 'angular-file-uploader';
import { QuillModule } from 'ngx-quill';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { BandejaCotizacionesComponent } from './components/administrador/cotizaciones/bandeja-cotizaciones/bandeja-cotizaciones.component';
import { CatalogoFactoresComponent } from './components/administrador/cotizaciones/catalogo-factores/catalogo-factores.component';
import { TableFactoresUsoComponent } from './components/administrador/cotizaciones/catalogo-factores/table-factores-uso/table-factores-uso.component';
import { FormFactoresCalidadComponent } from './components/administrador/cotizaciones/catalogo-factores/form-factores-calidad/form-factores-calidad.component';
import { ProductosComponent } from './components/administrador/productos/productos.component';
import { SociosComponent } from './components/administrador/socios/socios.component';
import { MensajePresidenteComponent } from './components/administrador/mensajes/mensaje-presidente/mensaje-presidente.component';
import { NotificacionesComponent } from './components/administrador/mensajes/notificaciones/notificaciones.component';
import { PagosComponent } from './components/administrador/pagos/pagos.component';
import { FormProductosComponent } from './components/administrador/productos/form-productos/form-productos.component';
import { TableSociosComponent } from './components/administrador/socios/table-socios/table-socios.component';
import { TablePagosComponent } from './components/administrador/pagos/table-pagos/table-pagos.component';
import { MensajesComponent } from './components/administrador/mensajes/mensajes.component';
import { TableBandejaCotizacionesComponent } from './components/administrador/cotizaciones/bandeja-cotizaciones/table-bandeja-cotizaciones/table-bandeja-cotizaciones.component';
import { NoticiasComponent } from './components/administrador/noticias/noticias.component';
import { FormNoticiasComponent } from './components/administrador/noticias/form-noticias/form-noticias.component';
import { AgendaComponent } from './components/administrador/agenda/agenda.component';
import { FormAgendaComponent } from './components/administrador/agenda/form-agenda/form-agenda.component';
import { NormatecaComponent } from './components/administrador/normateca/normateca.component';
import { FormNormatecaComponent } from './components/administrador/normateca/form-normateca/form-normateca.component';
import { ReverseArrayPipe } from './pipes/reverse-array.pipe';
import { DetalleAgendaComponent } from './components/administrador/agenda/detalle-agenda/detalle-agenda.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { NgDropRequisitoDirective } from './directives/ng-drop-requisito.directive';
import { DetalleNoticiaComponent } from './components/administrador/noticias/detalle-noticia/detalle-noticia.component';
import { FormSocioComponent } from './components/administrador/socios/form-socio/form-socio.component';
import { DetalleSocioComponent } from './components/administrador/socios/detalle-socio/detalle-socio.component';
import { SlidesComponent } from './components/administrador/slides/slides.component';
import { FormSlideComponent } from './components/administrador/slides/form-slide/form-slide.component';
import { NgDropSlideDirective } from './directives/ng-drop-slide.directive';
import { DetalleSlideComponent } from './components/administrador/slides/detalle-slide/detalle-slide.component';
import { DetalleNormatecaComponent } from './components/administrador/normateca/detalle-normateca/detalle-normateca.component';
import { DetalleMensajeComponent } from './components/administrador/mensajes/mensaje-presidente/detalle-mensaje/detalle-mensaje.component';
import { DetalleProductosComponent } from './components/administrador/productos/detalle-productos/detalle-productos.component';
import { DetallePagoComponent } from './components/administrador/pagos/detalle-pago/detalle-pago.component';
import { DetalleCotizacionComponent } from './components/administrador/cotizaciones/bandeja-cotizaciones/detalle-cotizacion/detalle-cotizacion.component';
import { FormBajaSocioComponent } from './components/administrador/socios/form-baja-socio/form-baja-socio.component';
import { CursosComponent } from './components/administrador/cursos/cursos.component';
import { TableDiasComponent } from './components/administrador/cursos/table-dias/table-dias.component';
import { TableParticipantesComponent } from './components/administrador/cursos/table-participantes/table-participantes.component';
import { TableEspecialidadesComponent } from './components/administrador/cursos/table-especialidades/table-especialidades.component';
import { FormCursoComponent } from './components/administrador/cursos/form-curso/form-curso.component';
import { EditarCursoComponent } from './components/administrador/cursos/editar-curso/editar-curso.component';
import { FormEspecialidadComponent } from './components/administrador/cursos/form-especialidad/form-especialidad.component';
import { FormParticipanteComponent } from './components/administrador/cursos/form-participante/form-participante.component';
import { FormDiaComponent } from './components/administrador/cursos/form-dia/form-dia.component';
import { TableAsistenciasComponent } from './components/administrador/cursos/table-asistencias/table-asistencias.component';
import { ConveniosComponent } from './components/administrador/convenios/convenios.component';
import { SolicitudesComponent } from './components/administrador/solicitudes/solicitudes.component';
import { TableSolicitudesComponent } from './components/administrador/solicitudes/table-solicitudes/table-solicitudes.component';
import { DetalleSolicitudComponent } from './components/administrador/solicitudes/detalle-solicitud/detalle-solicitud.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    LoginComponent,
    BandejaCotizacionesComponent,
    CatalogoFactoresComponent,
    TableFactoresUsoComponent,
    FormFactoresCalidadComponent,
    ProductosComponent,
    SociosComponent,
    MensajePresidenteComponent,
    NotificacionesComponent,
    PagosComponent,
    FormProductosComponent,
    TableSociosComponent,
    TablePagosComponent,
    MensajesComponent,
    TableBandejaCotizacionesComponent,
    NoticiasComponent,
    FormNoticiasComponent,
    AgendaComponent,
    FormAgendaComponent,
    NormatecaComponent,
    FormNormatecaComponent,
    ReverseArrayPipe,
    DetalleAgendaComponent,
    NgDropFilesDirective,
    NgDropRequisitoDirective,
    DetalleNoticiaComponent,
    FormSocioComponent,
    DetalleSocioComponent,
    SlidesComponent,
    FormSlideComponent,
    NgDropSlideDirective,
    DetalleSlideComponent,
    DetalleNormatecaComponent,
    DetalleMensajeComponent,
    DetalleProductosComponent,
    DetallePagoComponent,
    DetalleCotizacionComponent,
    FormBajaSocioComponent,
    CursosComponent,
    TableDiasComponent,
    TableParticipantesComponent,
    TableEspecialidadesComponent,
    FormCursoComponent,
    EditarCursoComponent,
    FormEspecialidadComponent,
    FormParticipanteComponent,
    FormDiaComponent,
    TableAsistenciasComponent,
    ConveniosComponent,
    SolicitudesComponent,
    TableSolicitudesComponent,
    DetalleSolicitudComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule,
    AngularFileUploaderModule,
    QuillModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatExpansionModule,
    MatRadioModule,
    MatTabsModule,
    MatTreeModule,
    MatDatepickerModule,
    MatStepperModule,
    MatBadgeModule,
    MatTooltipModule,
    MatGridListModule,
    MatMomentDateModule,
    MatButtonToggleModule,
  ],
  providers: [
    MatDatepickerModule,
    NgbActiveModal,
    // AuthGuard,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: LOCALE_ID, useValue: 'es-Mx' }, // Para cambiar la fecha a Español-México
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  entryComponents: [
    FormNormatecaComponent,
    DetalleNormatecaComponent,
    DetalleAgendaComponent,
    FormNoticiasComponent,
    FormAgendaComponent,
    DetalleNoticiaComponent,
    FormSocioComponent,
    DetalleSocioComponent,
    FormSlideComponent,
    DetalleSlideComponent,
    DetalleMensajeComponent,
    FormProductosComponent,
    DetalleProductosComponent,
    DetallePagoComponent,
    DetalleCotizacionComponent,
    FormBajaSocioComponent,
    FormCursoComponent,
    FormEspecialidadComponent,
    FormParticipanteComponent,
    FormDiaComponent,
    DetalleSolicitudComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
