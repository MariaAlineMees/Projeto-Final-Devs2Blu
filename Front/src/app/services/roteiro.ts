import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class RoteiroService {
  private apiUrl = '/api/roteiros';

  constructor(private http: HttpClient) { }

  getRoteiros(): Observable<Roteiro[]> {
    return this.http.get<Roteiro[]>(this.apiUrl);
  }

  criarRoteiro(roteiro: Roteiro): Observable<Roteiro> {
    return this.http.post<Roteiro>(this.apiUrl, roteiro);
  }

  atualizarRoteiro(roteiro: Roteiro): Observable<Roteiro> {
    return this.http.put<Roteiro>(`${this.apiUrl}/${roteiro.id}`, roteiro);
  }

  deletarRoteiro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}