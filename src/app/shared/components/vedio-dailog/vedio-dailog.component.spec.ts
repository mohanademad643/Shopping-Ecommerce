import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioDailogComponent } from './vedio-dailog.component';

describe('VedioDailogComponent', () => {
  let component: VedioDailogComponent;
  let fixture: ComponentFixture<VedioDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VedioDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VedioDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
