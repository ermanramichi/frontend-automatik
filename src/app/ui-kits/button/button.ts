import { Component } from '@angular/core';

import { Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() theme : 'light' | 'dark' = 'light';

  get buttonClasses(): string {
    const baseClasses = 'w-full text-[14px] md:text-[18px]  py-1 rounded-md font-bold transition-colors duration-200 cursor-pointer';

    const themeClasses = {
      light: 'bg-white text-darkmatik hover:bg-redmatik-200',
      dark: 'bg-redmatik text-white hover:bg-redmatik-900 '
    };
    return baseClasses + ' ' + themeClasses[this.theme];
  }
}
