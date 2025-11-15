import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Job } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3002/api';

  constructor(private http: HttpClient) { }

  getJobs(params?: any): Observable<ApiResponse<Job[]>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http.get<ApiResponse<Job[]>>(`${this.baseUrl}/jobs`, { params: httpParams });
  }

  getJobById(id: string): Observable<ApiResponse<Job>> {
    return this.http.get<ApiResponse<Job>>(`${this.baseUrl}/jobs/${id}`);
  }

  createJob(job: Job): Observable<ApiResponse<Job>> {
    return this.http.post<ApiResponse<Job>>(`${this.baseUrl}/jobs`, job);
  }
}