import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCartsComponent } from './all-carts.component';

describe('AllCartsComponent', () => {
  let component: AllCartsComponent;
  let fixture: ComponentFixture<AllCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
