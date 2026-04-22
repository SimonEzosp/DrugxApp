import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Chart, registerables } from 'chart.js';
import { UsuarioComponent } from 'src/app/components/usuario/usuario.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,UsuarioComponent]
})
export class DashboardPage implements OnInit {

  @ViewChild('chartDiario') chartDiario!: ElementRef;
  @ViewChild('chartSemanal') chartSemanal!: ElementRef;
  @ViewChild('chartMensual') chartMensual!: ElementRef;

  private apiUrl = 'https://drogxsystem-production.up.railway.app/api/v1';

  totalDiario = 0;
  totalSemanal = 0;
  totalMensual = 0;
  ventasDiarias = 0;
  ventasSemanales = 0;
  ventasMensuales = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.http.get<any[]>(`${this.apiUrl}/ventas`).subscribe(ventas => {
      const hoy = new Date();

      const diarias = ventas.filter(v => {
        const fecha = new Date(v.fecha_venta);
        return fecha.toDateString() === hoy.toDateString();
      });

      const semanales = ventas.filter(v => {
        const fecha = new Date(v.fecha_venta);
        const diff = (hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });

      const mensuales = ventas.filter(v => {
        const fecha = new Date(v.fecha_venta);
        return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
      });

      this.ventasDiarias = diarias.length;
      this.ventasSemanales = semanales.length;
      this.ventasMensuales = mensuales.length;

      this.totalDiario = diarias.reduce((acc, v) => acc + v.precio_unitario * v.cantidad_vendida, 0);
      this.totalSemanal = semanales.reduce((acc, v) => acc + v.precio_unitario * v.cantidad_vendida, 0);
      this.totalMensual = mensuales.reduce((acc, v) => acc + v.precio_unitario * v.cantidad_vendida, 0);

      setTimeout(() => {
        this.crearGraficaDiaria(diarias);
        this.crearGraficaSemanal(semanales);
        this.crearGraficaMensual(mensuales);
      }, 300);
    });
  }

  crearGraficaDiaria(ventas: any[]) {
    const labels = ventas.map(v => v.producto?.nombre_producto || 'Sin nombre');
    const data = ventas.map(v => v.precio_unitario * v.cantidad_vendida);

    new Chart(this.chartDiario.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Total ($)', data, backgroundColor: '#3880ff' }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  crearGraficaSemanal(ventas: any[]) {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const totales = new Array(7).fill(0);

    ventas.forEach(v => {
      const dia = new Date(v.fecha_venta).getDay();
      totales[dia] += v.precio_unitario * v.cantidad_vendida;
    });

    new Chart(this.chartSemanal.nativeElement, {
      type: 'line',
      data: {
        labels: dias,
        datasets: [{ label: 'Total ($)', data: totales, borderColor: '#2dd36f', tension: 0.4, fill: false }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  crearGraficaMensual(ventas: any[]) {
    const semanas = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
    const totales = new Array(4).fill(0);

    ventas.forEach(v => {
      const dia = new Date(v.fecha_venta).getDate();
      const semana = Math.min(Math.floor((dia - 1) / 7), 3);
      totales[semana] += v.precio_unitario * v.cantidad_vendida;
    });

    new Chart(this.chartMensual.nativeElement, {
      type: 'bar',
      data: {
        labels: semanas,
        datasets: [{ label: 'Total ($)', data: totales, backgroundColor: '#eb445a' }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
}
