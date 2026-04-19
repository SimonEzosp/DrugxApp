import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.scss'],
  imports: [CommonModule, FormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader]
})
export class LaboratoriosComponent implements OnInit {

  private apiUrl = 'http://localhost:8000/api/v1';
  laboratorios: any[] = [];
  nuevo = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(`${this.apiUrl}/laboratorios`).subscribe(d => this.laboratorios = d);
  }

  agregar() {
    if (!this.nuevo.trim()) return;
    this.http.post(`${this.apiUrl}/laboratorios`, { nombre: this.nuevo }).subscribe(() => {
      this.nuevo = '';
      this.cargar();
    });
  }
}