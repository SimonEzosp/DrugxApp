import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-venta-formulario',
  templateUrl: './venta-formulario.component.html',
  styleUrls: ['./venta-formulario.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol]
})
export class VentaFormularioComponent implements OnInit {

  @Output() ventaGuardada = new EventEmitter<any>();

  private apiUrl = 'https://drogxsystem-production.up.railway.app/api/v1';

  venta = {
    id_venta: 0,
    id_producto: null,
    precio_unitario: 0,
    cantidad_vendida: 0,
    fecha_venta: ''
  };

  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.http.get<any[]>(`${this.apiUrl}/productos`).subscribe(d => this.productos = d);
  }

  guardar() {
    const datos = {
      ...this.venta,
      id_venta: Date.now(),
      fecha_venta: this.venta.fecha_venta
        ? new Date(this.venta.fecha_venta).toISOString()
        : null
    };

    this.http.post(`${this.apiUrl}/ventas`, datos).subscribe({
      next: (res) => {
        this.ventaGuardada.emit(res);
        this.limpiar();
      },
      error: (err) => alert('Error al guardar: ' + JSON.stringify(err.error))
    });
  }

  limpiar() {
    this.venta = {
      id_venta: 0,
      id_producto: null,
      precio_unitario: 0,
      cantidad_vendida: 0,
      fecha_venta: ''
    };
  }
}
