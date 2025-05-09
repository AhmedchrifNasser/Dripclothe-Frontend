import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from "@angular/material/badge";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import { StyleComponent } from './components/style/style.component';
import { StyleDetailComponent } from './components/style-detail/style-detail.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import {MatStepperModule} from "@angular/material/stepper";
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarouselReviewsComponent } from './components/carousel-reviews/carousel-reviews.component';
import { FooterComponent } from './components/footer/footer.component';
import { PopupComponent } from './components/popup/popup.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AuthGuard} from "./auth.guard";
import { AboutComponent } from './components/about/about.component';
import {NgOptimizedImage} from "@angular/common";
import { TrackStatusComponent } from './components/track-status/track-status.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ArtistesComponent } from './components/artistes/artistes.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StyleComponent,
    StyleDetailComponent,
    ProductComponent,
    CheckoutComponent,
    CartDetailsComponent,
    ReviewsComponent,
    ContactComponent,
    CarouselReviewsComponent,
    FooterComponent,
    PopupComponent,
    AboutComponent,
    TrackStatusComponent,
    ListProductsComponent,
    ArtistesComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
