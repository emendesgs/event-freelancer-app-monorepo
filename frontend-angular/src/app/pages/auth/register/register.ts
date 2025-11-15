import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
})
export class RegisterComponent {
  formData = {
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bio: '',
    location: '',
    skills: ''
  };
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    this.error = null;

    if (this.formData.password !== this.formData.confirmPassword) {
      this.error = 'As senhas não coincidem';
      return;
    }

    if (this.formData.password.length < 6) {
      this.error = 'A senha deve ter pelo menos 6 caracteres';
      return;
    }

    this.isLoading = true;

    const { confirmPassword, ...rest } = this.formData;

    const userData = {
      ...rest,
      skills: rest.skills ? rest.skills.split(',').map(skill => skill.trim()) : [],
      languages: [],
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.error = err.error.message || 'Erro ao criar conta';
      }
    });
  }
}