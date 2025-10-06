import { Component, Output, EventEmitter } from '@angular/core';
import { DropdownComponent } from "../dropdown-component/dropdown-component";
import {  } from 'stream';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  selectedPage='home';
  clicked=false;
  dropdownOpen = false;
  @Output() isActive = new EventEmitter<boolean>();
  private mouseOutTimeout: any;
  onClick(id: string) {
    this.selectedPage = id;


    if (id === 'categories') {
      this.dropdownOpen = true;
      this.isActive.emit(this.dropdownOpen);
    } else {
      this.dropdownOpen = false;
      this.isActive.emit(this.dropdownOpen);
    }
  }
  onHover(){
    if (this.mouseOutTimeout) {
      clearTimeout(this.mouseOutTimeout);
      this.mouseOutTimeout = null;
    }

    this.dropdownOpen = true;
    this.isActive.emit(this.dropdownOpen);
  }

  ngOnDestroy() {
    if (this.mouseOutTimeout) {
      clearTimeout(this.mouseOutTimeout);
    }
  }



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


