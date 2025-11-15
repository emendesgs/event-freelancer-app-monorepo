import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    this.error = '';
    this.isLoading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.error = err.message || 'Erro ao fazer login';
        this.isLoading = false;
      }
    });
  }
}