import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonGrid, IonRow, IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  imports: [IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, FormsModule]
})
export class ProductoComponent implements OnInit, OnChanges {

  @Output() productoGuardado = new EventEmitter<any>();
  @Input() productoEditar: any = null;

  private apiUrl = 'https://drogxsystem-production.up.railway.app/api/v1';

  producto = {
    id_producto: 0,
    nombre_producto: '',
    cantidad: 0,
    id_unidad: null,
    id_via: null,
    expediente: null,
    fechaexpedicion: '',
    id_vigencia: null,
    id_laboratorio: null
  };

  unidades: any[] = [];
  vias: any[] = [];
  vigencias: any[] = [];
  laboratorios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarDatos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productoEditar'] && this.productoEditar) {
      this.producto = {
        id_producto: this.productoEditar.id_producto,
        nombre_producto: this.productoEditar.nombre_producto,
        cantidad: this.productoEditar.cantidad,
        id_unidad: this.productoEditar.id_unidad,
        id_via: this.productoEditar.id_via,
        expediente: this.productoEditar.expediente,
        fechaexpedicion: this.productoEditar.fechaexpedicion
          ? this.productoEditar.fechaexpedicion.split('T')[0]
          : '',
        id_vigencia: this.productoEditar.id_vigencia,
        id_laboratorio: this.productoEditar.id_laboratorio
      };
    }
  }

  cargarDatos() {
    this.http.get<any[]>(`${this.apiUrl}/unidades`).subscribe(d => this.unidades = d);
    this.http.get<any[]>(`${this.apiUrl}/vias`).subscribe(d => this.vias = d);
    this.http.get<any[]>(`${this.apiUrl}/vigencias`).subscribe(d => this.vigencias = d);
    this.http.get<any[]>(`${this.apiUrl}/laboratorios`).subscribe(d => this.laboratorios = d);
  }

  guardar() {
    const datos = {
      ...this.producto,
      id_producto: this.producto.id_producto || Date.now(),
      fechaexpedicion: this.producto.fechaexpedicion
        ? new Date(this.producto.fechaexpedicion).toISOString()
        : null
    };

    if (this.producto.id_producto) {
      this.http.put(`${this.apiUrl}/productos/${this.producto.id_producto}`, datos).subscribe({
        next: (res) => { this.productoGuardado.emit(res); this.limpiar(); },
        error: (err) => alert('Error al actualizar: ' + JSON.stringify(err.error))
      });
    } else {
      this.http.post(`${this.apiUrl}/productos`, datos).subscribe({
        next: (res) => { this.productoGuardado.emit(res); this.limpiar(); },
        error: (err) => alert('Error al guardar: ' + JSON.stringify(err.error))
      });
    }
  }

  limpiar() {
    this.producto = {
      id_producto: 0,
      nombre_producto: '',
      cantidad: 0,
      id_unidad: null,
      id_via: null,
      expediente: null,
      fechaexpedicion: '',
      id_vigencia: null,
      id_laboratorio: null
    };
  }
}