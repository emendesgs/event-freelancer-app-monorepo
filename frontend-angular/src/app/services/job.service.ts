import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Job } from '../types';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private apiService: ApiService) { }

  getJobs(params?: any): Observable<Job[]> {
    return this.apiService.getJobs(params).pipe(
      map(response => response.data)
    );
  }

  getJob(id: string): Observable<Job> {
    return this.apiService.getJobById(id).pipe(
      map(response => response.data)
    );
  }

  createJob(job: Job): Observable<Job> {
    return this.apiService.createJob(job).pipe(
      map(response => response.data)
    );
  }
}