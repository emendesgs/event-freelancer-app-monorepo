import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Job } from '../../types';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  categories: string[] = ['Todas', 'Fotografia', 'Design', 'Vídeo', 'Música', 'Decoração', 'Organização'];
  types: string[] = ['Todos', 'Freelance', 'Tempo Integral', 'Parcial'];
  searchTerm: string = '';
  selectedCategory: string = 'Todas';
  selectedType: string = 'Todos';
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobService.getJobs().subscribe(
      (data) => {
        this.jobs = data;
        this.filteredJobs = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load jobs';
        this.isLoading = false;
      }
    );
  }

  filterJobs(): void {
    const params: any = {};
    if (this.searchTerm) {
      params.q = this.searchTerm;
    }
    if (this.selectedCategory && this.selectedCategory !== 'Todas') {
      params.category = this.selectedCategory;
    }
    if (this.selectedType && this.selectedType !== 'Todos') {
      params.type = this.selectedType;
    }

    this.isLoading = true;
    this.jobService.getJobs(params).subscribe(
      (data) => {
        this.jobs = data;
        this.filteredJobs = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load jobs';
        this.isLoading = false;
      }
    );
  }
}