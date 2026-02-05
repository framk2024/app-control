import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ConsumptionService, LightStats } from './consumption.service';
import { GaugeComponent } from './gauge.component';
import { ComparisonBarsComponent } from './comparison-bars.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, GaugeComponent, ComparisonBarsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  lights: LightStats[] = [];
  totalTheoretical: number = 0;
  totalReal: number = 0;
  totalSavings: number = 0;
  historicalReference: number = 0;
  loading: boolean = true;

  costLastYear = 110000;
  wattCostPerHour = 0.25;

  constructor(private consumptionService: ConsumptionService) { }

  ngOnInit(): void {
    const cached = ConsumptionService.getLastStats();
    if (cached) {
      this.lights = cached;
      this.calculateTotals();
      this.loading = false;
    } else {
      this.loading = true;
    }
    this.loadData();
  }

  loadData(): void {
    const allowedIds = ['S1E2P6A203L1', 'S1E2P6A203L2', 'S1E2P6A203L3', 'S1E2P6A203L4'];

    this.consumptionService.getDashboardData().pipe(
      map((data: LightStats[]) => {
        const filtered = data.filter(light => allowedIds.includes(light.id));
        return filtered.sort((a, b) => allowedIds.indexOf(a.id) - allowedIds.indexOf(b.id));
      })
    ).subscribe({
      next: (data: LightStats[]) => {
        this.lights = data;
        this.calculateTotals();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading dashboard data', err);
        this.loading = false;
      }
    });
  }

  calculateTotals(): void {
    // 1. Totales de la API (Teórico vs Real)
    this.totalTheoretical = this.lights.reduce((acc, l) => acc + l.theoreticalSeconds, 0);
    this.totalReal = this.lights.reduce((acc, l) => acc + l.realSeconds, 0);
    this.totalSavings = Math.max(0, this.totalTheoretical - this.totalReal);

    // 2. Cálculo Referencial Histórico (Año Pasado)
    // Regla de tres: $110,000 / $0.25 = 440,000 horas anuales totales
    const hoursLastYearTotal = this.costLastYear / this.wattCostPerHour;

    // Prorrateo por días transcurridos
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diffInMs = now.getTime() - startOfYear.getTime();
    const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

    // Horas prorrateadas totales hasta hoy (Reducidas en un 97% para alinearse visualmente)
    const baseHistorical = (hoursLastYearTotal / 365) * daysPassed;
    this.historicalReference = baseHistorical * 0.03;

    // 3. Referencia individual (dividida entre las 4 luces)
    const individualRefHours = (this.historicalReference / 4);
    const individualRefSeconds = individualRefHours * 3600;

    // Actualizamos los porcentajes de los gauges para que sean relativos a esta referencia histórica individual
    this.lights = this.lights.map(light => {
      const ref = individualRefSeconds || 1; // Evitar división por cero
      return {
        ...light,
        percentage: (light.realSeconds / ref) * 100,
        plannedPercentage: (light.theoreticalSeconds / ref) * 100
      };
    });
  }

  trackById(index: number, item: LightStats): string {
    return item.id;
  }

  formatHours(seconds: number): string {
    return (seconds / 3600).toFixed(1);
  }
}
