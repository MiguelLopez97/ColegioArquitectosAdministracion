import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { CriptoService } from '../../services/cripto.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {

  public fullNameDesencriptado: string;
  currentLang = "en";
  toggleClass = "fas fa-expand";
  placement = "bottom-right";
  public isCollapsed = true;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(
    private layoutService: LayoutService, 
    private configService:ConfigService,
    private _authService: AuthService,
    private _criptoService: CriptoService,
    private _router: Router
  ) { 
    //Desencriptación del fullName tomado del localStorage
    this.fullNameDesencriptado = this._criptoService.decrypt(localStorage.getItem('fullName'));
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
  }

  ngAfterViewInit() {
    if(this.config.layout.dir) {
      const dir = this.config.layout.dir;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
    }
  }
  
  ToggleClass() {
    if (this.toggleClass === "fas fa-expand") {
      this.toggleClass = "fas fa-compress";
    } else {
      this.toggleClass = "fas fa-expand";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  //Método click para cerrar sesión
  cerrarSesion() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
