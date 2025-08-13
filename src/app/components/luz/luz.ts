// src/app/luz/luz.ts
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
 selector: 'app-luz',
 standalone: true,
 imports: [NgClass],
 templateUrl: './luz.html',
 styleUrl: './luz.scss'
})
export class Luz {
 @Input() name: string = '';
 @Input() state: 'on' | 'off' = 'off';

 constructor() {}
}