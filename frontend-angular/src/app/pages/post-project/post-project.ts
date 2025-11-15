import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Job } from '../../types';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-post-project',
  templateUrl: './post-project.html',
  styleUrls: ['./post-project.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PostProjectComponent {
  job: Partial<Job> = {};
  isLoading = false;
  error: string | null = null;

  constructor(private jobService: JobService) { }

  postJob() {
    this.isLoading = true;
    this.error = null;
    this.jobService.createJob(this.job as Job).subscribe({
      next: (response) => {
        console.log('Job created successfully', response);
        this.isLoading = false;
        // Reset form or redirect
      },
      error: (error) => {
        console.error('Error creating job', error);
        this.error = 'Failed to create job. Please try again.';
        this.isLoading = false;
      }
    });
  }
}