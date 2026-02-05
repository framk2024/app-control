import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gauge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gauge-box">
      <svg viewBox="0 0 100 60" class="gauge-svg">
        <!-- Fondo base: Rojo (Año Anterior) -->
        <path d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" stroke="#f44336" stroke-width="12" stroke-linecap="round"/>
        
        <!-- Capa: Amarillo (Planificado) -->
        <path d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" stroke="#ffc107" stroke-width="12" stroke-linecap="round"
              stroke-dasharray="125.66"
              [style.stroke-dashoffset]="125.66 - (plannedValue / 100 * 125.66)"/>
              
        <!-- Capa: Verde (Real SAICL) -->
        <path d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" stroke="#4caf50" stroke-width="12" stroke-linecap="round"
              stroke-dasharray="125.66"
              [style.stroke-dashoffset]="125.66 - (value / 100 * 125.66)"/>
      </svg>
      <div class="gauge-value">{{ value | number:'1.1-1' }}%</div>
      <div class="gauge-label">{{ label }}</div>
    </div>
  `,
  styles: [`.gauge-box { width: 120px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; }
            .gauge-svg { width: 100px; height: 60px; display: block; transition: none !important; }
            .gauge-svg path { transition: none !important; }
            .gauge-value { position: absolute; top: 22px; width: 100%; text-align: center; font-size: 15px; font-weight: 900; color: #fff; font-family: 'Courier New', monospace; text-shadow: 2px 2px 0 #000; }
            .gauge-label { margin-top: -12px; font-size: 8.5px; font-weight: bold; color: #7abaff; text-align: center; width: 100px; overflow: hidden; text-overflow: ellipsis; }`]
})
export class GaugeComponent {
  @Input() value: number = 0; // Real %
  @Input() plannedValue: number = 0; // Planificado %
  @Input() label: string = '';
}
