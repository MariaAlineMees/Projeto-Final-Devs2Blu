// front/src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- Novo: Para API REST
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Novo: Para Forms

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(), // <--- Adiciona o provedor HTTP
    
    // Configuração para usar Formulários (necessário para o binding dos inputs)
    importProvidersFrom(FormsModule) // <--- Adiciona o provedor de Formulários
  ]
};