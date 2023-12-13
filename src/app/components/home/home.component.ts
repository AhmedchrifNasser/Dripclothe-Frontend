import { Component } from '@angular/core';
import {Artiste} from "../../models/artiste";
import {FormControl} from "@angular/forms";
import {Review} from "../../models/review";
import {map, Observable, startWith} from "rxjs";
import {ArtisteService} from "../../services/artiste.service";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  artistes!: Artiste[];
  filteringArtistes!: Artiste[];
  control = new FormControl('');
  artisteNames: string[] = [];
  selectedName!: string;
  reviews!: Review[];
  filteredArtisteName!: Observable<string[]>;
  constructor(private artisteService: ArtisteService,
              private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.listReviews();
    this.listArtistes();
    this.filteredArtisteName = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  listArtistes(){
    this.artisteService.getArtistes().subscribe(
      (res)=> {
        this.artistes = res;
        this.filteringArtistes = res;
        this.artistes.forEach((ar) => this.artisteNames.push(ar.name));
      }
    )
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.artisteNames.filter(artisteName => this._normalizeValue(artisteName).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  filterArtisteByName(artisteName: string) {
    if((artisteName == "")||(artisteName == null)){
      this.filteringArtistes = this.artistes
    }else{
      this.filteringArtistes = this.artistes.filter((art) => art.name === artisteName);
    }
  }

  clear() {
    this.filteringArtistes = this.artistes
  }

  listReviews(){
    this.reviewService.getReviews().subscribe((res)=> {
      this.reviews = res;
      console.log(this.reviews);

    });
  }
}
