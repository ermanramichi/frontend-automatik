import { Component } from '@angular/core';
import { HeroComponent } from "./hero-component/hero-component";
import { AboutComponent } from "./about-component/about-component";
import { ExperienceComponent } from "./experience-component/experience-component";
import { ContactComponent } from "./contact-component/contact-component";

@Component({
  selector: 'app-main-component',
  imports: [HeroComponent, AboutComponent, ExperienceComponent, ContactComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {

}
