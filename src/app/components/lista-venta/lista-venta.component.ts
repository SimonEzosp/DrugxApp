import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonListHeader,
  IonBadge, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.component.html',
  styleUrls: ['./lista-venta.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonListHeader, IonBadge, IonButton, IonIcon]
})
export class ListaVentaComponent implements OnInit {
  productos: any[] = [];
  private apiUrl = 'http://localhost:8000/api/v1';
  ventas: any[] = [];

  constructor(private http: HttpClient) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    this.http.get<any[]>(`${this.apiUrl}/productos`).subscribe(d => {
      this.productos = d;
      this.cargar();
  });
  }

  cargar() {
    this.http.get<any[]>(`${this.apiUrl}/ventas`).subscribe(d => this.ventas = d);
  }

  getNombre(id: number): string {
    const item = this.productos.find(p => p.id_producto === id);
    return item ? item.nombre_producto : '';
  }
  eliminar(id: number) {
    this.http.delete(`${this.apiUrl}/ventas/${id}`).subscribe({
      next: () => this.cargar(),
      error: () => alert('Error al eliminar la venta')
    });
  }
}