import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experience-component',
  imports: [CommonModule],
  templateUrl: './experience-component.html',
  styleUrl: './experience-component.css'
})
export class ExperienceComponent {
  constructor(private route: ActivatedRoute) {}
  activeDiv:string='technologies';
  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const el = document.getElementById(fragment);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 0); // wait for DOM to be ready
        }
      }
    });
  }
  showDiv(showDiv:string){
    this.activeDiv=showDiv;
  }
  
}
