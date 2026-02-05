import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-light-gauge',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="light-gauge-box">
      <div class="gauge-header">{{ label }}</div>
      <div class="bars-stack">
        <div class="mini-bar red" [style.width.%]="100"></div>
        <div class="mini-bar yellow" [style.width.%]="plannedValue"></div>
        <div class="mini-bar green" [style.width.%]="value"></div>
      </div>
      <div class="gauge-percent">{{ value | number:'1.1-1' }}%</div>
    </div>
  `,
    styles: [`
    .light-gauge-box { width: 120px; height: 90px; background: rgba(255,255,255,0.03); border-radius: 12px; padding: 10px; display: flex; flex-direction: column; gap: 8px; align-items: center; border: 1px solid rgba(255,255,255,0.05); box-sizing: border-box; }
    .gauge-header { font-size: 10px; font-weight: bold; color: #7abaff; text-transform: uppercase; }
    .bars-stack { width: 100%; height: 30px; display: flex; flex-direction: column; gap: 3px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 6px; box-sizing: border-box; }
    .mini-bar { height: 6px; border-radius: 3px; transition: none !important; }
    .red { background: #f44336; opacity: 0.6; }
    .yellow { background: #ffc107; opacity: 0.8; }
    .green { background: #4caf50; }
    .gauge-percent { font-size: 16px; font-weight: 900; color: #fff; font-family: 'Courier New', monospace; text-shadow: 1px 1px 0 #000; }
  `]
})
export class LightGaugeComponent {
    @Input() value: number = 0;
    @Input() plannedValue: number = 0;
    @Input() label: string = '';
}
