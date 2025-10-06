import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresListingComponent } from './stores-listing-component';

describe('StoresListingComponent', () => {
  let component: StoresListingComponent;
  let fixture: ComponentFixture<StoresListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
