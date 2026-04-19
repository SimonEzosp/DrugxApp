import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid } from '@ionic/angular/standalone';
import { VentaFormularioComponent } from 'src/app/components/venta-formulario/venta-formulario.component';
import { ListaVentaComponent } from 'src/app/components/lista-venta/lista-venta.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, CommonModule, FormsModule, VentaFormularioComponent, ListaVentaComponent]
})
export class VentaPage implements OnInit {

  @ViewChild('listaVentas') listaVentas!: ListaVentaComponent;

  constructor() {}

  ngOnInit() {}

  onVentaGuardada(venta: any) {
    this.listaVentas.cargar();
  }
}