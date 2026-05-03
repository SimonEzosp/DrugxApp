import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonGrid,IonButton,IonCard,IonCardTitle,IonCardSubtitle,IonCardContent,IonCardHeader,IonText,IonAvatar,IonImg,IonInput,IonInputPasswordToggle,IonRow,IonCol  } from '@ionic/angular/standalone';
import {LoginComponent} from 'src/app/components/login/login.component'
import {UsuarioComponent} from 'src/app/components/usuario/usuario.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonGrid,IonButton,IonCard,IonCardTitle,IonCardSubtitle,IonCardContent,IonCardHeader,IonText,IonAvatar,IonImg,IonInput,IonInputPasswordToggle,LoginComponent,UsuarioComponent,IonRow,
    IonCol
    ]
})
export class HomePage implements OnInit {
  // home.page.ts
    jyk = 'assets/icon/jyk.png';
    simon = 'assets/icon/simon.png';
  constructor() { }

  ngOnInit() {
  }

}
