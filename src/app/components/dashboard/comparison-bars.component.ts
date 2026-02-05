import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-comparison-bars',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bars-container">
      <div class="bar-row">
        <span class="bar-label">Año Anterior</span>
        <div class="bar-track"><div class="bar-fill red" [style.width.%]="100"></div></div>
      </div>
      <div class="bar-row">
        <span class="bar-label">Planificado</span>
        <div class="bar-track"><div class="bar-fill yellow" [style.width.%]="calculateWidth(planned)"></div></div>
      </div>
      <div class="bar-row">
        <span class="bar-label">Real (SAICL)</span>
        <div class="bar-track"><div class="bar-fill green" [style.width.%]="calculateWidth(real)"></div></div>
      </div>
    </div>
  `,
    styles: [`
    .bars-container { width: 100%; display: flex; flex-direction: column; gap: 12px; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 12px; box-sizing: border-box; }
    .bar-row { display: flex; flex-direction: column; gap: 4px; }
    .bar-label { font-size: 0.75rem; font-weight: bold; color: #aaa; text-transform: uppercase; }
    .bar-track { width: 100%; height: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 6px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 6px; transition: none !important; }
    .red { background: #f44336; }
    .yellow { background: #ffc107; }
    .green { background: #4caf50; }
  `]
})
export class ComparisonBarsComponent {
    @Input() reference: number = 1;
    @Input() planned: number = 0;
    @Input() real: number = 0;

    calculateWidth(val: number): number {
        if (!this.reference) return 0;
        return Math.min(100, (val / this.reference) * 100);
    }
}
