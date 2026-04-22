import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonList, IonItem, IonLabel, IonInput, IonButton,
  IonListHeader, IonIcon, IonSelect, IonSelectOption, IonBadge,IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonListHeader, IonIcon, IonSelect, IonSelectOption, IonBadge,IonText]
})
export class UsuarioComponent implements OnInit {

  private apiUrl = 'https://drogxsystem-production.up.railway.app/api/v1';
  usuarios: any[] = [];
  roles: any[] = [];

  nuevo = {
    idusuario: 0,
    username: '',
    password: '',
    rol: null
  };

  constructor(private http: HttpClient) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    this.cargar();
    this.cargarRoles();
  }

  cargar() {
    this.http.get<any[]>(`${this.apiUrl}/usuarios`).subscribe(d => this.usuarios = d);
  }

  cargarRoles() {
    this.http.get<any[]>(`${this.apiUrl}/roles`).subscribe(d => {
      this.roles = d;
      console.log('roles:', d); // ← agregar
    });
  }
  agregar() {
    if (!this.nuevo.username || !this.nuevo.password || !this.nuevo.rol) {
      alert('Completa todos los campos');
      return;
    }
    
    const datos = {
      ...this.nuevo,
      idusuario: Date.now()
    };

    this.http.post(`${this.apiUrl}/usuarios`, datos).subscribe({
      next: () => {
        this.cargar();
        this.limpiar();
      },
      error: (err) => alert('Error: ' + JSON.stringify(err.error))
    });
  }

  eliminar(id: number) {
    this.http.delete(`${this.apiUrl}/usuarios/${id}`).subscribe({
      next: () => this.cargar(),
      error: () => alert('Error al eliminar usuario')
    });
  }

  limpiar() {
    this.nuevo = { idusuario: 0, username: '', password: '', rol: null };
  }

  getRolNombre(rol: number): string {
    const r = this.roles.find(r => r.idrol === rol);
    return r ? r.nombrerol : rol.toString();
  }
}