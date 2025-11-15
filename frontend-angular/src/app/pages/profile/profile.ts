import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../types';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  saveProfile() {
    if (this.user) {
      // Call a service to update the user profile
      console.log('Saving profile...', this.user);
    }
  }
}