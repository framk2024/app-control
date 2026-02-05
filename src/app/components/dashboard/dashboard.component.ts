import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumptionService, LightStats } from './consumption.service';
import { GaugeComponent } from './gauge.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, GaugeComponent],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    lights: LightStats[] = [];
    totalTheoretical: number = 0;
    totalReal: number = 0;
    totalSavings: number = 0;
    loading: boolean = true;

    constructor(private consumptionService: ConsumptionService) { }

    ngOnInit(): void {
        this.consumptionService.getDashboardData().subscribe({
            next: (data) => {
                this.lights = data;
                this.calculateTotals();
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                // Mock data fallback
                this.lights = [
                    { id: 'L1', realSeconds: 36000, theoreticalSeconds: 72000, percentage: 50, plannedPercentage: 0 },
                    { id: 'L2', realSeconds: 43200, theoreticalSeconds: 72000, percentage: 60, plannedPercentage: 0 }
                ];
                this.calculateTotals();
            }
        });
    }

    calculateTotals(): void {
        this.totalTheoretical = this.lights.reduce((acc, l) => acc + l.theoreticalSeconds, 0);
        this.totalReal = this.lights.reduce((acc, l) => acc + l.realSeconds, 0);
        this.totalSavings = Math.max(0, this.totalTheoretical - this.totalReal);
    }

    formatHours(seconds: number): string {
        return (seconds / 3600).toFixed(1);
    }
}
