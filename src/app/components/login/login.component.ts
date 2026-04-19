import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInputPasswordToggle, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/data/service/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonInput, IonInputPasswordToggle, IonButton, FormsModule,CommonModule]
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.guardarSesion(res.access_token, res.user.rol);
        this.router.navigate(['/inventario']);
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}