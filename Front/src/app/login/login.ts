import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/roteiros']);
        } else {
          this.errorMessage = 'Usuário ou senha inválidos.';
        }
      },
      error: () => {
        this.errorMessage = 'Erro ao tentar fazer login. Tente novamente mais tarde.';
      }
    });
  }
}
