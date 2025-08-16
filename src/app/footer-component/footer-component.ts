import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent {
  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
