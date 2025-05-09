import {Component, OnInit} from '@angular/core';
import {Artiste} from "../../models/artiste";
import {FormControl} from "@angular/forms";
import {Review} from "../../models/review";
import {map, Observable, startWith} from "rxjs";
import {ArtisteService} from "../../services/artiste.service";
import {ReviewService} from "../../services/review.service";
import {Meta, Title} from "@angular/platform-browser";
import {ArtisteCachService} from "../../services/artiste-cach.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  artistes!: Artiste[];
  filteringArtistes!: Artiste[];
  control = new FormControl('');
  artisteNames: string[] = [];
  reviews!: Review[];
  filteredArtisteName!: Observable<string[]>;
  images = ['assets/banner4.png']
  currentImage!: string;
  private currentIndex = 0;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(private artisteService: ArtisteService,
              private artisteCacheService: ArtisteCachService,
              private cartService: CartService,
              private metaTagService: Meta,
              private titleService: Title) {
  }
  parentData: any;
  ngOnInit(): void {
    this.parentData = this.cartService.genderSelected;
    console.log(this.parentData)
    this.currentImage = this.images[this.currentIndex];
    this.titleService.setTitle('DripClothe - Get Your Swag Right with Affordable Luxury Styles');

    // Set the meta tags
    this.metaTagService.addTags([
      { name: 'description', content: 'Discover DripClothe: Your go-to for affordable luxury styles. We specialize in matching and providing low-cost clothing inspired by artists and celebrities. Elevate your swag with the best drip at unbeatable prices.' },
      { name: 'keywords', content: 'affordable luxury clothes, celebrity style, drip clothes, fashion, swag, low price fashion, DripClothe' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:title', content: 'DripClothe - Affordable Luxury Styles' },
      { property: 'og:description', content: 'Discover DripClothe: Your go-to for affordable luxury styles inspired by celebrities. Elevate your swag with the best drip at unbeatable prices.' },
      { property: 'og:image', content: 'https://yourwebsite.com/path-to-image.jpg' },
      { property: 'og:url', content: 'https://www.dripclothe.com/' },
      { property: 'og:type', content: 'website' },
    ]);
    //this.listReviews();
    //this.listArtistes();
    this.loadArtistes(this.currentPage);
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
  loadArtistes(page: number): void {
    this.artisteCacheService.getData('artistes', page, this.pageSize).subscribe(
      (data) => {
        this.artistes = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = page;
        this.filteringArtistes = data.content;
        this.artistes.forEach((ar) => this.artisteNames.push(ar.name));
      },
      (error) => {
        console.error('Failed to load users', error);
      }
    );
  }

  goToPage(page: number): void {
    this.loadArtistes(page);
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

  /*listReviews(){
    this.reviewService.getReviews().subscribe((res)=> {
      this.reviews = res;
    });
  }*/


  closeNav() {
    (document.getElementById("mySidenav")as HTMLFormElement).style.width = "0";
  }
  openNav() {
    (document.getElementById("mySidenav") as HTMLFormElement).style.width = "250px";
  }

  scrollToContent(): void {
    const content = document.getElementById('content');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
