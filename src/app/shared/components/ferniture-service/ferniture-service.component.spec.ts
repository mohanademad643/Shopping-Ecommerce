import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FernitureServiceComponent } from './ferniture-service.component';

describe('FernitureServiceComponent', () => {
  let component: FernitureServiceComponent;
  let fixture: ComponentFixture<FernitureServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FernitureServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FernitureServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
