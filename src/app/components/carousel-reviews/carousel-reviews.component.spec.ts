import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselReviewsComponent } from './carousel-reviews.component';

describe('CarouselReviewsComponent', () => {
  let component: CarouselReviewsComponent;
  let fixture: ComponentFixture<CarouselReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
