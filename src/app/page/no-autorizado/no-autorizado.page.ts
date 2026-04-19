import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-no-autorizado',
  templateUrl: './no-autorizado.page.html',
  styleUrls: ['./no-autorizado.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NoAutorizadoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
