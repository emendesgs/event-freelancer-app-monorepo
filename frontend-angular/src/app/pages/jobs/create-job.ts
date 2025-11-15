import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class CreateJobComponent implements OnInit {
  jobForm: FormGroup;
  categories = [
    'Fotografia',
    'Videomaker',
    'Design Gráfico',
    'Marketing Digital',
    'Desenvolvimento de Sites',
    'Organização de Eventos',
    'Consultoria',
    'Outros',
  ];
  types = ['Freelance', 'Contrato', 'Meio Período', 'Tempo Integral'];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      requirements: this.fb.array([this.fb.control('', Validators.required)]),
      deadline: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get requirements(): FormArray {
    return this.jobForm.get('requirements') as FormArray;
  }

  addRequirement(): void {
    this.requirements.push(this.fb.control('', Validators.required));
  }

  removeRequirement(index: number): void {
    if (this.requirements.length > 1) {
      this.requirements.removeAt(index);
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.jobForm.get(controlName);
    if (control && control.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    if (control && control.hasError('email')) {
      return 'Por favor, insira um email válido.';
    }
    return '';
  }

  handleSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: () => this.router.navigate(['/jobs']),
      error: (err: any) => console.error('Failed to create job', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }
}