import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class HeroComponent {

}