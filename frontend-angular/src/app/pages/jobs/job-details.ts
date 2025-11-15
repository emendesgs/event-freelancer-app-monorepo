import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../types';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.html',
  styleUrls: ['./job-details.css'],
  standalone: true,
  imports: [CommonModule]
})
export class JobDetailsComponent implements OnInit {
  job: Job | undefined;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobService.getJob(id)
        .subscribe(job => this.job = job);
    }
  }
}