import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";
import {Size} from "../../models/size";
import {Color} from "../../models/color";
import {Photo} from "../../models/photo";
import {Location} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId!: number;
  product!: Product;
  selectedSizeId!: number;
  selectedColorId!: number;
  photos!: Photo[];
  test: any[] = [];
  selectedIndex: number = 0;
  constructor(private productService:ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private _location: Location,
              private titleService: Title,
              private metaTagService: Meta) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('productId')!;
      this.titleService.setTitle("DripClothe - " + params.get('productName')!);
      this.metaTagService.updateTag({
        name: 'description',
        content: `Explore the ${params.get('productName')} in your favorite size and color. Customize your style with our premium selection and find the perfect fit. Shop now for the latest in fashion trends.`
      });
    })
    this.listProduct();

  }
  backClicked() {
    this._location.back();
  }
  listProduct(){
    this.productService.getProductById(this.productId).subscribe(
      (res)=> {
        console.log(res)
        this.product = res;
        this.photos = this.product.photos;
        this.product.sizes.sort((a,b) => a.id - b.id)
        this.product.colors.sort((a,b) => a.id - b.id)
        this.selectedSizeId = this.product.sizes[0].id;
        this.selectedColorId = this.product.colors[0].id;
        this.test = this.photos.filter(ph => ph.color == this.product.colors[0].name );
      }
    )
  }
  addToCart(product: Product) {
    let addedProduct = new Product();
    addedProduct.name = product.name;
    addedProduct.id = product.id;
    addedProduct.price = product.price;
    addedProduct.description = product.description;
    addedProduct.colors = product.colors.filter(color => color.id == this.selectedColorId);
    addedProduct.photos = product.photos.filter(ph => ph.color == addedProduct.colors[0].name );
    addedProduct.style = product.style;
    addedProduct.sizes = product.sizes.filter(size => size.id == this.selectedSizeId);
    addedProduct.shippingFee = product.shippingFee;
    const theCartItem = new CartItem(addedProduct);
    this.cartService.addToCart(theCartItem);
  }

  buyNow(product: Product) {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.shippingFees.next(0);
    this.cartService.persistCartItems();
    this.addToCart(product);

    this.router.navigate(['/cartDetails'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }

  changeSize(size: Size) {
    this.selectedSizeId = size.id;
  }

  changeColor(color: Color) {
    this.selectedColorId = color.id;
    this.test = this.photos.filter(ph => ph.color == color.name )
    this.selectedIndex = 0;
  }

  onPrevClick() {
    if(this.selectedIndex == 0)
      return;
    this.selectedIndex -=1;
  }

  onNextClick() {
    if(this.selectedIndex === this.photos.length - 1)
      return;
    this.selectedIndex +=1;
  }
}
