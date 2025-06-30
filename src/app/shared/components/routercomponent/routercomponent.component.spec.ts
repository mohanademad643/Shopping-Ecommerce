import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutercomponentComponent } from './routercomponent.component';

describe('RoutercomponentComponent', () => {
  let component: RoutercomponentComponent;
  let fixture: ComponentFixture<RoutercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutercomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
