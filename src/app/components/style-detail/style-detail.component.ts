import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Product} from "../../models/product";

@Component({
  selector: 'app-style-detail',
  templateUrl: './style-detail.component.html',
  styleUrls: ['./style-detail.component.css']
})
export class StyleDetailComponent implements OnInit{
  link: string = "https://angular.io/assets/images/tutorials/faa/example-house.jpg";
  constructor(private productService:ProductService,
              private route: ActivatedRoute) {
  }
  styleId!: number;
  products!: Product[];
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.styleId = +params.get('styleId')!;
    });
    this.listStyleProducts();
  }
  listStyleProducts(){
    this.productService.getProductsByStyle(this.styleId).subscribe(
      (res)=> {
        this.products = res;
        console.log(this.products)
      }
    )
  }

  navigateToProductDetail(id: number) {

  }
}
