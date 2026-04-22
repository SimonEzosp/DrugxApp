import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-vigencias',
  templateUrl: './vigencias.component.html',
  styleUrls: ['./vigencias.component.scss'],
  imports: [CommonModule, FormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader]
})
export class VigenciasComponent implements OnInit {

  private apiUrl = 'https://drogxsystem-production.up.railway.app/api/v1';
  vigencias: any[] = [];
  nueva = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${this.apiUrl}/vigencias`).subscribe(d => this.vigencias = d);
  }

  agregar() {
    if (!this.nueva.trim()) return;
    this.http.post(`${this.apiUrl}/vigencias`, {
      id_vigencia: Date.now(), 
      descripcion_vigencia: this.nueva 
    }).subscribe(() => {
      this.nueva = '';
      this.cargar();
    });
  }
}