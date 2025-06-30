import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingPrdComponent } from './trending-prd.component';

describe('TrendingPrdComponent', () => {
  let component: TrendingPrdComponent;
  let fixture: ComponentFixture<TrendingPrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingPrdComponent]
    });
    fixture = TestBed.createComponent(TrendingPrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
