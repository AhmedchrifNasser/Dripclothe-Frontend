import { Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReviewService} from "../../services/review.service";
import {ShopValidators} from "../../validators/shop-validators";
import {Review} from "../../models/review";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{

  reviewFormGroup!: FormGroup;
  stars = [0, 1, 2, 3, 4];
  starNumber!: number;
  typoIncorrect = false;
  constructor(private formBuilder: FormBuilder,
              private reviewService: ReviewService,
              private eRef: ElementRef,
              private renderer: Renderer2,
              private dialogRef : MatDialog,
              private router: Router,
              private titleService: Title) {
  }

  get firstName(){return this.reviewFormGroup.get('firstName');}
  get lastName(){return this.reviewFormGroup.get('lastName');}
  get review(){return this.reviewFormGroup.get('review');}

  ngOnInit(): void {
    this.titleService.setTitle("DripClothe - Reviews");
    this.reviewFormGroup = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(2),ShopValidators.notOnlyWhiteSpace]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(2),ShopValidators.notOnlyWhiteSpace]),
      review: new FormControl("", [Validators.required, Validators.minLength(2),ShopValidators.notOnlyWhiteSpace]),
    });

  }
  setRating(rating:number) {
    let oldStarNumber = rating;
    this.starNumber = oldStarNumber + 1;
    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');
    for (let i = 0, j = svgs.length; i < j; i++) {
      if (i <= rating) {
        this.renderer.addClass(svgs[i], 'active');
      } else {
        this.renderer.removeClass(svgs[i], 'active');
      }
    }
  }
  openDialog(msg: string,success: boolean){
    this.dialogRef.open(PopupComponent,{
      data: {
        message : msg,
        success : success
      }
    });
  }
  submitReview() {
    if(this.reviewFormGroup.invalid){
      this.typoIncorrect = true;
      this.reviewFormGroup.markAllAsTouched();
      return;
    }

    if (this.starNumber == 0 || this.starNumber == undefined){
      this.openDialog("You have to give star rating",false );
      return;
    }

    let review: Review;
    review = this.reviewFormGroup.value;
    review.starNumber = this.starNumber;


    this.reviewService.addReview(review).subscribe(
      {
        next: response => {
          this.openDialog('Your review has been received, checked it below.',true);
          this.reviewFormGroup.reset();
          this.starNumber = 0;
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/reviews']);
          });
        },
        error: err => {
          this.openDialog(`There was an error: ${err.message}`,false );
        }
      }
    )
  }
}
