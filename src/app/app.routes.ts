import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Control } from './components/control/control';
import { Menu } from './components/menu/menu';
import { Luz } from './components/luz/luz';

export const routes: Routes = [
  { path: '', component: Menu},  
  { path: 'dash', component: Dashboard },
  { path: 'ctrl', component: Control },
  { path: 'luz/:id', component: Luz },
  { path: '**', component: Menu }
];
