import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-vias',
  templateUrl: './vias.component.html',
  styleUrls: ['./vias.component.scss'],
  imports: [CommonModule, FormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader]
})
export class ViasComponent implements OnInit {

  private apiUrl = 'http://localhost:8000/api/v1';
  vias: any[] = [];
  nueva = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${this.apiUrl}/vias`).subscribe(d => this.vias = d);
  }

  agregar() {
    if (!this.nueva.trim()) return;
    this.http.post(`${this.apiUrl}/vias`, { descripcion_via: this.nueva }).subscribe(() => {
      this.nueva = '';
      this.cargar();
    });
  }
}