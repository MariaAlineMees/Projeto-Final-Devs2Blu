// src/app/app.ts (Seu Componente Raiz)

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header><h1>Planejador de Viagens 🌍✈️🚗🚆🚢</h1></header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  title = 'roteiro-front';
}
