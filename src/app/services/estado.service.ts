import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse, RelayStatus } from '../models/estado';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private readonly options = {
    headers: new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', // ← Esto evita la página de advertencia
    }),
  };

  // Creamos la Signal para el estado de los relés, pero la inicializamos fuera del constructor
  public relayStatus = signal<RelayStatus | undefined>(undefined);

  constructor() {
    // 💡 Llamamos a la función de refresco en el constructor
    // para que la Signal se inicialice al cargar la aplicación.
    this.refreshStatus();
  }

  // Método para refrescar el estado de la Signal desde la API
  public refreshStatus() {
    this.http
      .get<ApiResponse>(`${this.apiUrl}/status`, this.options)
      .pipe(map((response) => response.relays))
      .subscribe((relays) => {
        this.relayStatus.set(relays);
      });
  }

  // Método para encender/apagar todos los relés
  public toggleAll(action: 'on' | 'off'): Observable<any> {
    return this.http.get(`${this.apiUrl}/all/${action}`, this.options);
  }

  // Método para controlar un solo relé
  public toggleRelay(relayId: string, action: 'on' | 'off'): Observable<any> {
    const id = relayId.split('_')[1];
    return this.http.get(`${this.apiUrl}/relay/${id}/${action}`, this.options);
  }
}

/*
 public toggleAll(action: 'on' | 'off'): Observable<any> {
    return this.http.get(`${this.apiUrl}/all/${action}`, this.options);
  }

*/

