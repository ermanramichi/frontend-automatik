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
      light: 'bg-white text-automatik hover:bg-gray-300',
      dark: 'bg-automatik text-white hover:bg-automatik-900 '
    };
    return baseClasses + ' ' + themeClasses[this.theme];
  }
}
