import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountDetailsComponent } from './pages/discount-details/discount-details.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';


import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileGuard } from './shared/guards/profile.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'discounts/:id', component: DiscountDetailsComponent },
  { path: 'menu/:category', component: ProductComponent },
  { path: 'menu/:category/:name', component: ProductDetailsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard ] },
  { path: 'admin-login', component: AuthComponent  },
  { path: 'admin', component: AdminComponent, canActivate: [ AdminGuard ], children: [
    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: 'discount', component: AdminDiscountComponent },
  ] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
