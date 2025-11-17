// front/src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(), 
    
    // Configuração para usar Formulários 
    importProvidersFrom(FormsModule) 
  ]
};