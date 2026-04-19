import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import { ProductoComponent } from 'src/app/components/producto/producto.component';
import { UnidadesComponent } from 'src/app/components/unidades/unidades.component';
import { ViasComponent } from 'src/app/components/vias/vias.component';
import { VigenciasComponent } from 'src/app/components/vigencias/vigencias.component';
import { LaboratoriosComponent } from 'src/app/components/laboratorios/laboratorios.component';
import { ListaProductosComponent } from 'src/app/components/lista-producto/lista-producto.component'
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid,
    IonSegment, IonSegmentButton, IonLabel,
    CommonModule, FormsModule,
    ProductoComponent,
    UnidadesComponent, ViasComponent, VigenciasComponent, LaboratoriosComponent,ListaProductosComponent
  ]
})
export class InventarioPage implements OnInit {
  @ViewChild('listaProductos') listaProductos!: ListaProductosComponent;
  tabActual = 'productos';
  productoEditar: any = null;
  constructor() {}

  ngOnInit() {}

  onProductoGuardado(producto: any) {
    this.listaProductos.cargar();
    this.productoEditar = null; // limpiar después de guardar
  }

  onEditarProducto(producto: any) {  // ← agregar
    this.productoEditar = producto;
  }
}