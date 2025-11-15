
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule]
})
export default class DashboardComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}