import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSkeletonComponent } from './checkout-skeleton.component';

describe('CheckoutSkeletonComponent', () => {
  let component: CheckoutSkeletonComponent;
  let fixture: ComponentFixture<CheckoutSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
