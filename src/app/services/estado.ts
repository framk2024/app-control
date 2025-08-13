// src/app/services/estado.service.ts
import { Injectable, inject, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiResponse, RelayStatus } from '../models/estado';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Estado {
  private readonly http = inject(HttpClient);
  private apiUrl = 'http://192.168.0.101:8100';

  // Creamos la Signal para el estado de los relés, pero la inicializamos fuera del constructor
  public relayStatus = signal<RelayStatus | undefined>(undefined);

  constructor() {
    // 💡 Llamamos a la función de refresco en el constructor
    // para que la Signal se inicialice al cargar la aplicación.
    this.refreshStatus();
  }

  // Método para refrescar el estado de la Signal desde la API
  public refreshStatus() {
    this.http.get<ApiResponse>(`${this.apiUrl}/status`).pipe(
      map(response => response.relays)
    ).subscribe(relays => {
      // 💡 Actualiza la Signal directamente con el nuevo valor
      this.relayStatus.set(relays);
    });
  }

  // Método para encender/apagar todos los relés
  public toggleAll(action: 'on' | 'off'): Observable<any> {
    return this.http.get(`${this.apiUrl}/all/${action}`);
  }

  // Método para controlar un solo relé
  public toggleRelay(relayId: string, action: 'on' | 'off'): Observable<any> {
    const id = relayId.split('_')[1]; // Extrae el número del ID (ej. 'relay_1' -> '1')
    return this.http.get(`${this.apiUrl}/relay/${id}/${action}`);
  }
}