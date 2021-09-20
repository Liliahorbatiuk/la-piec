import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountDetailsComponent } from './pages/discount-details/discount-details.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthComponent } from './auth/auth.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';

import { HryvniaPipe } from './shared/pipes/hryvnia.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment.prod';

import { OrderModule } from 'ngx-order-pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader-config';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountsComponent,
    DiscountDetailsComponent,
    ProductComponent,
    ProductDetailsComponent,
    PaymentComponent,
    BasketComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminDiscountComponent,
    HryvniaPipe,
    SearchPipe,
    ProfileComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    OrderModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig), // import NgxUiLoaderModule
    NgxUiLoaderRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
