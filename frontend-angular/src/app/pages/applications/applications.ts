import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Job } from '../../types';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './applications.html',
  styleUrls: ['./applications.css']
})
export class ApplicationsComponent {
  applications: Job[] = [];
  // Mock data for applied jobs
}