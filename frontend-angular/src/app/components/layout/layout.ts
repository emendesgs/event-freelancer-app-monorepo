import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/header/header';
import { FooterComponent } from '../../core/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {

}