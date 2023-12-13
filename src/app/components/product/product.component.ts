import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../models/cart-item";
import {Size} from "../../models/size";
import {Color} from "../../models/color";
import {PhotoService} from "../../services/photo.service";
import {Photo} from "../../models/photo";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  link: string = "https://angular.io/assets/images/tutorials/faa/example-house.jpg";
  productId!: number;
  product!: Product;
  selectedSizeId!: number;
  selectedColorId!: number;
  photos!: Photo[];// = [{photo:"https://drive.google.com/uc?export=view&id=179USzPDVMh8XiXpiVOwHiWR7A-1bA5Bz",color:"black"}, {photo:"assets/test1.jpg",color:"black"}, {photo:"assets/test3.jpg",color:"white"}];
  test!: any[];
  selectedIndex: number = 0;
  constructor(private productService:ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private photoService: PhotoService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('productId')!;
    })
    //this.test = this.photos;

    this.listPhotos();
    this.listProduct();

  }
  listProduct(){
    this.productService.getProductById(this.productId).subscribe(
      (res)=> {
        this.product = res;
        this.product.sizes.sort((a,b) => a.id - b.id)
        this.product.colors.sort((a,b) => a.id - b.id)
        this.selectedSizeId = this.product.sizes[0].id;
        this.selectedColorId = this.product.colors[0].id;
        this.test = this.photos.filter(ph => ph.color == this.product.colors[0].name );
        console.log(this.test)
      }
    )
  }
  listPhotos() {
    this.photoService.getPhotosByProductId(this.productId).subscribe(
      (res) => {
        this.photos = res;
        this.test = this.photos;
      }
    )
  }
  addToCart(product: Product) {
    let addedProduct = new Product();
    addedProduct.name = product.name;
    addedProduct.id = product.id;
    addedProduct.price = product.price;
    addedProduct.description = product.description;
    addedProduct.photos = product.photos;
    addedProduct.style = product.style;
    addedProduct.sizes = product.sizes.filter(size => size.id == this.selectedSizeId);
    addedProduct.colors = product.colors.filter(color => color.id == this.selectedColorId);
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
    console.log(this.test)
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
