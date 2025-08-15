import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, provideZoneChangeDetection, importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ¡Importa esto!
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

const firebaseConfig = {
  apiKey: "AIzaSyC1s6MQ68ylxOApM_poZ9U4EYSzSy1bnhk",
  authDomain: "app-control-tfm.firebaseapp.com",
  projectId: "app-control-tfm",
  storageBucket: "app-control-tfm.firebasestorage.app",
  messagingSenderId: "957623614240",
  appId: "1:957623614240:web:7ad1dd00bcb4ea7db8f545",
  measurementId: "G-PWGGX5ME1J"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig))
  ]
}



