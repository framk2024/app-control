import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Luz } from '../luz/luz';
@Component({
  selector: 'app-control',
  imports: [RouterLink, Luz],
  templateUrl: './control.html',
  styleUrl: './control.scss'
})
export class Control {
  
  // app.component.ts o el componente de tu menú
menuItems = [
  { title: 'L1'},
  { title: 'L2'},
  { title: 'L3'},
  { title: 'L4'},
  { title: 'L5'},
  { title: 'L6'},
  { title: 'On'},
  { title: 'Rs'}
];
constructor(private router: Router) {}
selectItem(selectedItem: any) {
  // Primero, desactiva todos los botones
  //this.menuItems.forEach(item => item.isActive = false);

  // Luego, activa el botón seleccionado
  selectedItem.isActive = true;

  // Redirige a la nueva ruta
  this.router.navigateByUrl(selectedItem.title.toLowerCase());
}

}
