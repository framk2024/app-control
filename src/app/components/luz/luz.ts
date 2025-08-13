import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-luz',
  imports: [NgClass],
  templateUrl: './luz.html',
  styleUrl: './luz.scss'
})
export class Luz {
  @Input() name: string = '';
  isActive: boolean = false;

  constructor(private router: Router) {}

  toggleLuz() {
    // Lógica para cambiar el estado de la luz
    this.isActive = !this.isActive;

    // Lógica de enrutamiento basada en el nombre de la luz
    if (this.name === 'On') {
      // Lógica para encender todas las luces
      //this.router.navigateByUrl('l/7');
      this.name = 'Off'
    } else if (this.name === 'Off') {
      // Lógica para apagar todas las luces
      //this.router.navigateByUrl('l/8');
      this.name = 'On'
    } else {
      // Lógica para luces individuales
      const luzNumber = this.name.substring(1); // 'L1' -> '1'
      //this.router.navigateByUrl(`l/${luzNumber}`);
      //this.router.navigateByUrl('ctlr');

    }
  }
}