import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MainCategoriesComponent } from "../categories/main-categories-component/main-categories-component";

@Component({
  selector: 'app-dropdown-component',
  imports: [MainCategoriesComponent],
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.css'
})
export class DropdownComponent {
  @Input() dropDownActive!:boolean;
  @Output() notActive = new EventEmitter<boolean>();

  get baseClasses():string{

    const baseClasses = 'drop-down w-full h-[600px] bg-white fixed top-24 left-0 flex items-start justify-start shadow-xl transition-all duration-300 ease-in-out';

    if (this.dropDownActive) {
      return `${baseClasses} z-[9998] opacity-100 translate-y-0`;
    }

    return `${baseClasses} z-[9998] opacity-0 -translate-y-4 pointer-events-none`;

  }


}
