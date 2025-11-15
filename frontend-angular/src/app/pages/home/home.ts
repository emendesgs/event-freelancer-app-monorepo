import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {}