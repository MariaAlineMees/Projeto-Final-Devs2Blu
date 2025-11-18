import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoteiroService, Roteiro } from '../services/roteiro';
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-roteiro',
  templateUrl: './roteiro.html',
  styleUrls: ['./roteiro.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RoteiroComponent implements OnInit {

  roteiros: Roteiro[] = [];
  username$: Observable<string | null>;

  novoRoteiro: Roteiro = {
    titulo: '',
    destino: '',
    dataInicio: '',
    dataFim: '',
    custoEstimado: 0
  };

  isEditing = false;

  constructor(
    private roteiroService: RoteiroService,
    private authService: AuthService,
    private router: Router
  ) {
    this.username$ = this.authService.currentUsername$;
  }

  ngOnInit(): void {
    this.carregarRoteiros();
  }

  carregarRoteiros(): void {
    this.roteiroService.getRoteiros().subscribe({
      next: (data) => this.roteiros = data,
      error: (error) => console.error('Erro ao carregar roteiros:', error)
    });
  }

  salvarRoteiro(): void {
    if (this.isEditing && this.novoRoteiro.id !== undefined) {
      this.roteiroService.atualizarRoteiro(this.novoRoteiro).subscribe({
        next: () => {
          this.resetForm();
          this.carregarRoteiros();
        },
        error: (error) => console.error('Erro ao atualizar roteiro:', error)
      });
    } else {
      this.roteiroService.criarRoteiro(this.novoRoteiro).subscribe({
        next: () => {
          this.resetForm();
          this.carregarRoteiros();
        },
        error: (error) => console.error('Erro ao criar roteiro:', error)
      });
    }
  }

  deletarRoteiro(id: number | undefined): void {
    if (id === undefined) return;

    this.roteiroService.deletarRoteiro(id).subscribe({
      next: () => this.carregarRoteiros(),
      error: (error) => console.error('Erro ao deletar roteiro:', error)
    });
  }

  preencherFormulario(roteiro: Roteiro): void {
    this.novoRoteiro = { ...roteiro };
    this.isEditing = true;
  }

  resetForm(): void {
    this.novoRoteiro = {
      titulo: '',
      destino: '',
      dataInicio: '',
      dataFim: '',
      custoEstimado: 0
    };
    this.isEditing = false;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        // Mesmo que o logout no back-end falhe, força o redirecionamento
        this.router.navigate(['/login']);
      }
    });
  }
}
