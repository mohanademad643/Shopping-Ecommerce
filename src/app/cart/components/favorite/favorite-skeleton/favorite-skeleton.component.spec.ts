import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSkeletonComponent } from './favorite-skeleton.component';

describe('FavoriteSkeletonComponent', () => {
  let component: FavoriteSkeletonComponent;
  let fixture: ComponentFixture<FavoriteSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
