// front/src/app/services/roteiro.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface (Modelo) para o objeto Roteiro, refletindo a Entidade Java
export interface Roteiro {
  id?: number; 
  titulo: string;
  destino: string;
  dataInicio: string;
  dataFim: string;
  custoEstimado: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoteiroService { // Exportado com nome Service para injeção
  // A URL base aponta para o seu Back-end Spring Boot (porta 8080)
  private apiUrl = 'http://localhost:8080/api/roteiros';

  constructor(private http: HttpClient) { }

  // 1. READ ALL (GET /api/roteiros)
  getRoteiros(): Observable<Roteiro[]> {
    return this.http.get<Roteiro[]>(this.apiUrl);
  }

  // 2. CREATE (POST /api/roteiros) - Dispara o RabbitMQ no Back-end!
  criarRoteiro(roteiro: Roteiro): Observable<Roteiro> {
    return this.http.post<Roteiro>(this.apiUrl, roteiro);
  }

  // 3. UPDATE (PUT /api/roteiros/{id})
  atualizarRoteiro(roteiro: Roteiro): Observable<Roteiro> {
    return this.http.put<Roteiro>(`${this.apiUrl}/${roteiro.id}`, roteiro);
  }

  // 4. DELETE (DELETE /api/roteiros/{id})
  deletarRoteiro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}