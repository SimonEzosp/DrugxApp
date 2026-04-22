import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonListHeader,
  IonBadge, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonListHeader, IonBadge, IonButton, IonIcon]
})
export class ListaProductosComponent implements OnInit {

  @Output() editarProducto = new EventEmitter<any>();

  private apiUrl = 'https://drogxsystem-production.up.railway.app/api/v1';

  productos: any[] = [];
  unidades: any[] = [];
  vias: any[] = [];
  vigencias: any[] = [];
  laboratorios: any[] = [];

  constructor(private http: HttpClient) {
    addIcons({ trashOutline, createOutline });
  }

  ngOnInit() {
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    this.http.get<any[]>(`${this.apiUrl}/unidades`).subscribe(d => this.unidades = d);
    this.http.get<any[]>(`${this.apiUrl}/vias`).subscribe(d => this.vias = d);
    this.http.get<any[]>(`${this.apiUrl}/vigencias`).subscribe(d => this.vigencias = d);
    this.http.get<any[]>(`${this.apiUrl}/laboratorios`).subscribe(d => {
      this.laboratorios = d;
      console.log('laboratorios:', d);
      console.log('vigencias:', this.vigencias);
      this.cargar();
    });
  }

  cargar() {
    this.http.get<any[]>(`${this.apiUrl}/productos`).subscribe(d => this.productos = d);
  }

  getNombre(lista: any[], id: number, campoId: string, campoNombre: string): string {
    const item = lista.find(i => i[campoId] === id);
    return item ? item[campoNombre] : '';
  }

  editar(producto: any) {
    this.editarProducto.emit(producto);
  }

  eliminar(id: number) {
    this.http.get<any[]>(`${this.apiUrl}/inventario/producto/${id}`).subscribe({
      next: (inventarios) => {
        if (inventarios.length > 0) {
          const deletes = inventarios.map(inv =>
            this.http.delete(`${this.apiUrl}/inventario/${inv.id_inventario}`).toPromise()
          );
          Promise.all(deletes).then(() => {
            this.http.delete(`${this.apiUrl}/productos/${id}`).subscribe({
              next: () => this.cargar(),
              error: () => alert('Error al eliminar producto')
            });
          });
        } else {
          this.http.delete(`${this.apiUrl}/productos/${id}`).subscribe({
            next: () => this.cargar(),
            error: () => alert('Error al eliminar producto')
          });
        }
      },
      error: () => {
        this.http.delete(`${this.apiUrl}/productos/${id}`).subscribe({
          next: () => this.cargar(),
          error: () => alert('Error al eliminar producto')
        });
      }
    });
  }
}