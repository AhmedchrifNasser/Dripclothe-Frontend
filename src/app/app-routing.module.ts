import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {StyleComponent} from "./components/style/style.component";
import {StyleDetailComponent} from "./components/style-detail/style-detail.component";
import {ProductComponent} from "./components/product/product.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ReviewsComponent} from "./components/reviews/reviews.component";
import {AuthGuard} from "./auth.guard";
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'style/:artisteId', component: StyleComponent},
  {path: 'detail/:styleId', component:StyleDetailComponent},
  {path: 'product/:productId', component:ProductComponent},
  {path:'cartDetails', canActivate: [AuthGuard],component:CartDetailsComponent},
  {path:'checkout', canActivate: [AuthGuard],component:CheckoutComponent},
  {path:'reviews', component:ReviewsComponent},
  {path:'contact',component:ContactComponent},
  {path:'about', component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
