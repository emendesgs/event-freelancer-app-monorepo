import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: any) {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userData: any) {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, userData).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}