import { Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  selectedPage='home';
  clicked=false;
  onClick(id:string){
    this.selectedPage=id;
    this.clicked=!this.clicked;

  }

  dropdownOpen = false;

  languages = [
    { code: '1', name: 'English', flag: 'assets/languages/english.svg' },
    { code: '2', name: 'Macedonian', flag: 'assets/languages/mkd.png' },
    { code: '3', name: 'Albanian', flag: 'assets/languages/albanian.png' }
  ];

  selected = this.languages[0]; // Default

  selectLanguage(lang: any) {
    this.selected = lang;
    this.dropdownOpen = false;
  }
}
