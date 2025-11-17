// src/app/app.ts (Seu Componente Raiz)

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoteiroComponent } from './roteiro/roteiro'; // <--- IMPORT CORRETO!

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RoteiroComponent], // <--- Adicione o RoteiroComponent
  template: `
    <header><h1>Planejador de Roteiros 🌍</h1></header>
    <main>
      <app-roteiro></app-roteiro> </main>
  `,
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('roteiro-front');
}