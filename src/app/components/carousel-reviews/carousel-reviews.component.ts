import {Component, HostListener, OnInit} from '@angular/core';
import {Review} from "../../models/review";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-carousel-reviews',
  templateUrl: './carousel-reviews.component.html',
  styleUrls: ['./carousel-reviews.component.css']
})
export class CarouselReviewsComponent implements OnInit{
  selectedIndex = [0,1,2];
  reviews: Review[]= [];
  constructor(private reviewService: ReviewService) {
  }
  ngOnInit(): void {
    this.listReviews();

    this.VerticalOrHorizontalStepper();
  }

  listReviews(){
    this.reviewService.getReviews().subscribe((res)=> {
      this.reviews = res;
      this.reviews.sort((a,b) => b.id - a.id)
      this.reviews.forEach((item)=> {
        if(item.starNumber === undefined)
          item.starNumber = 0;
      })
    });
  }
  onPrevClick() {
    this.selectedIndex[0] -=1;
    if(this.selectedIndex.length == 1) {
      return;
    }
    this.selectedIndex[1] -=1;
    this.selectedIndex[2] -=1;
  }
  onNextClick(){
    this.selectedIndex[0] +=1;
    if(this.selectedIndex.length == 1) {
        return;
    }
    this.selectedIndex[1] +=1;
    this.selectedIndex[2] +=1;
  }
  @HostListener('window:resize', ['$event'])
  VerticalOrHorizontalStepper() {
    if (window.innerWidth < 800)
      this.selectedIndex = [0];
  }
}
