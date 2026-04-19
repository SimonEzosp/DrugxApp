import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonInput, IonButton,
  IonListHeader, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss'],
  imports: [CommonModule, FormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader, IonIcon]
})
export class UnidadesComponent implements OnInit {

  private apiUrl = 'http://localhost:8000/api/v1';
  unidades: any[] = [];
  nueva = '';

  constructor(private http: HttpClient) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${this.apiUrl}/unidades`).subscribe(d => this.unidades = d);
  }

  agregar() {
    if (!this.nueva.trim()) return;
    this.http.post(`${this.apiUrl}/unidades`, { descripcion_unidad: this.nueva }).subscribe(() => {
      this.nueva = '';
      this.cargar();
    });
  }
}