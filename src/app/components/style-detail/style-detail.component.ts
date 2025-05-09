import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Product} from "../../models/product";
import {Location} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-style-detail',
  templateUrl: './style-detail.component.html',
  styleUrls: ['./style-detail.component.css']
})
export class StyleDetailComponent implements OnInit{
  constructor(private productService:ProductService,
              private route: ActivatedRoute,
              private _location: Location,
              private titleService: Title,
              private metaTagService: Meta) {
  }
  styleId!: number;
  products: Product[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.styleId = +params.get('styleId')!;
      this.titleService.setTitle("DripClothe - " + params.get('artisteName')! + " style");
      this.metaTagService.updateTag({
        name: 'description',
        content: `Discover handpicked outfits inspired by ${params.get('artisteName')}! Explore the latest styles and find your perfect match among our curated selection of ${params.get('artisteName')}'s fashion.`
      });
    });
    this.listStyleProducts();
  }
  listStyleProducts(){
    this.productService.getProductsByStyle(this.styleId).subscribe(
      (res)=> {
        this.products = res;
      }
    )
  }
  backClicked() {
    this._location.back();
  }
}
