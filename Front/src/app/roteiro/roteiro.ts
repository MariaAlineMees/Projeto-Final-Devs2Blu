// front/src/app/roteiro/roteiro.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor, *ngIf
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { RoteiroService, Roteiro } from '../services/roteiro'; // <--- IMPORT CORRETO!

@Component({
  selector: 'app-roteiro',
  templateUrl: './roteiro.html', // <--- Usa roteiro.html (sem extensão)
  styleUrls: ['./roteiro.css'], // <--- Usa roteiro.css (sem extensão)
  standalone: true, // <--- Configuração Standalone
  imports: [CommonModule, FormsModule] // <--- Módulos locais
})
export class RoteiroComponent implements OnInit {

  roteiros: Roteiro[] = [];
  
  novoRoteiro: Roteiro = {
    titulo: '',
    destino: '',
    dataInicio: '',
    dataFim: '',
    custoEstimado: 0
  };
  
  isEditing = false;
  
  // 1. Injeta o RoteiroService (o nome da classe exportada) no construtor
  constructor(private roteiroService: RoteiroService) { }

  // 2. Método chamado quando o componente inicia
  ngOnInit(): void {
    this.carregarRoteiros();
  }

  // 3. READ: Busca todos os roteiros da API
  carregarRoteiros(): void {
    this.roteiroService.getRoteiros().subscribe({
      next: (data) => this.roteiros = data,
      error: (error) => console.error('Erro ao carregar roteiros:', error)
    });
  }

  // 4. CREATE/UPDATE: Salva um novo ou atualiza um existente
  salvarRoteiro(): void {
    if (this.isEditing && this.novoRoteiro.id !== undefined) {
      // Edição (PUT)
      this.roteiroService.atualizarRoteiro(this.novoRoteiro).subscribe({
        next: () => {
          this.resetForm();
          this.carregarRoteiros();
        },
        error: (error) => console.error('Erro ao atualizar roteiro:', error)
      });
    } else {
      // Criação (POST) - Dispara o RabbitMQ no Back-end!
      this.roteiroService.criarRoteiro(this.novoRoteiro).subscribe({
        next: () => {
          this.resetForm();
          this.carregarRoteiros();
        },
        error: (error) => console.error('Erro ao criar roteiro:', error)
      });
    }
  }

  // 5. DELETE: Remove um roteiro
  deletarRoteiro(id: number | undefined): void {
    if (id === undefined) return;
    
    this.roteiroService.deletarRoteiro(id).subscribe({
      next: () => this.carregarRoteiros(),
      error: (error) => console.error('Erro ao deletar roteiro:', error)
    });
  }

  // 6. Preenche o formulário para edição (PUT)
  preencherFormulario(roteiro: Roteiro): void {
    this.novoRoteiro = { ...roteiro }; 
    this.isEditing = true;
  }

  // 7. Limpa o formulário e o estado de edição
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
}