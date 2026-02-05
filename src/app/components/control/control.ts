import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Luz } from '../luz/luz';
import { CommonModule } from '@angular/common';
import { EstadoService } from '../../services/estado.service';
import { computed, signal } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [RouterLink, Luz, CommonModule],
  templateUrl: './control.html',
  styleUrl: './control.scss'
})
export class Control implements OnInit, OnDestroy {
  private readonly estadoService = inject(EstadoService);
  private router = inject(Router);
  private pollingInterval: any;

  public onButtonState = signal<'on' | 'off'>('off');
  public relayStatus = this.estadoService.relayStatus;

  /*// 💡 Lógica para transformar los nombres de los relés
  public relays = computed(() => {
    const status = this.relayStatus();
    if (!status) {
      return [];
    }
    return Object.entries(status).map(([id, state]) => {
      const lightNumber = id.split('_')[1]; // 'relay_1' -> '1'
      const lightName = `L${lightNumber}`; // '1' -> 'L1'
      return { name: lightName, state: state };
    });
  });*/
  public relays = computed(() => {
    const status = this.relayStatus();
    if (!status) {
      return [];
    }

    return Object.entries(status)
      .map(([id, state]) => {
        const lightNumber = id.split('_')[1]; // 'relay_1' -> '1'
        const lightName = `L${lightNumber}`; // '1' -> 'L1'
        return { name: lightName, state: state };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  ngOnInit() {
    // Solo iniciar el sondeo si estamos en entorno local para evitar consumo excesivo en Firebase
    if (this.isLocalNetwork()) {
      this.pollingInterval = setInterval(() => {
        this.estadoService.refreshStatus();
      }, 2000);
    }
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando el componente se destruye
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  private isLocalNetwork(): boolean {
    const hostname = window.location.hostname;
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.endsWith('.local')
    );
  }

  onAllRelaysButtonClick() {
    const currentState = this.onButtonState();
    const newAction = currentState === 'off' ? 'on' : 'off';

    this.estadoService.toggleAll(newAction).subscribe(() => {
      // Actualizar el estado visual del botón principal inmediatamente
      this.onButtonState.set(newAction);

      // Esperar para que el ESP32 y el worker actualicen el archivo de estado
      setTimeout(() => {
        this.estadoService.refreshStatus();
      }, 500); // 500ms es seguro para 4 relés
    });
  }

  onResetButtonClick() {
    this.estadoService.refreshStatus();
  }

  // 💡 El nombre de la luz ahora es 'L1', 'L2', etc.
  onRelayButtonClick(relayName: string) {
    const relays = this.relayStatus();
    if (relays) {
      const relayId = Object.keys(relays).find(key => key.includes(relayName.substring(1)));
      if (relayId) {
        const currentState = (relays as any)[relayId];
        const newAction = currentState === 'off' ? 'on' : 'off';

        this.estadoService.toggleRelay(relayId, newAction).subscribe(() => {
          // Esperar 400ms para que el ESP32 y el worker actualicen el estado
          setTimeout(() => {
            this.estadoService.refreshStatus();
          }, 300);
        });
      }
    }
  }
}

//{{ onButtonState() === 'on' ? 'Off' : 'On' }}