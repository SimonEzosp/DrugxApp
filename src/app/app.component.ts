import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { AuthService } from 'src/app/data/service/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {

  menuVisible = false;

public todasLasPaginas = [
  { title: 'Inicio',     url: '/home',       icon: 'mail',        roles: ['admin', 'farmaceutico', 'vendedor'] },
  { title: 'Dashboard',  url: '/dashboard',  icon: 'bar-chart',   roles: ['admin'] },
  { title: 'Inventario', url: '/inventario', icon: 'paper-plane', roles: ['admin', 'farmaceutico', 'vendedor'] },
  { title: 'Ventas',     url: '/venta',      icon: 'heart',       roles: ['admin', 'farmaceutico', 'vendedor'] },
];

  public paginasFiltradas: any[] = [];

  constructor(private auth: AuthService, private router: Router) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
    this.filtrarMenu();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuVisible = event.url !== '/' && event.url !== '/home';
      }
    });
    this.auth.rolCambiado.subscribe(() => {
    this.filtrarMenu();
  });
  }

  filtrarMenu() {
    const rol = this.auth.getRol();
    this.paginasFiltradas = this.todasLasPaginas.filter(p => p.roles.includes(rol));
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}