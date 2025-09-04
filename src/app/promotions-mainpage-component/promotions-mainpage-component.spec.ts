import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsMainpageComponent } from './promotions-mainpage-component';

describe('PromotionsMainpageComponent', () => {
  let component: PromotionsMainpageComponent;
  let fixture: ComponentFixture<PromotionsMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionsMainpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
