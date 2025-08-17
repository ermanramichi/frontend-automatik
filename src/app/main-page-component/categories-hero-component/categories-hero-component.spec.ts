import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesHeroComponent } from './categories-hero-component';

describe('CategoriesHeroComponent', () => {
  let component: CategoriesHeroComponent;
  let fixture: ComponentFixture<CategoriesHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
