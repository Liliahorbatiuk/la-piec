import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  basket: Array<IProduct> = [];
  totalPrice = 0;
  modalRef: BsModalRef;
  userEmail: string;
  userPassword: string;
  isLogin = false;
  isAdminLogin = false;
  constructor(private orderService: OrderService,
              private modalService: BsModalService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getLocalProducts();
    this.checkMyBasket();
    this.checkLocalUser();
    this.checkUserLogin();
  }

  private checkLocalUser(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'user') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
    else {
      this.isLogin = false;
    }
  }

  private checkUserLogin(): void {
    this.authService.checkSignIn.subscribe(() => {
      this.checkLocalUser();
    });
  }

  private checkMyBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.basket = data;
        this.totalPrice = this.getTotal(this.basket);
      }
    );
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket);
    }
    console.log(this.basket);
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  signModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  signUp(): void {
    if (this.userEmail && this.userPassword){
      this.authService.signUp(this.userEmail, this.userPassword);
    }
  }

  signIn(): void {
    if (this.userEmail && this.userPassword){
      this.authService.signIn(this.userEmail, this.userPassword);
    }
  }

  private checkAdmin(): void {
    if (localStorage.getItem('adminCredential')) {
      const admin = JSON.parse(localStorage.getItem('user'));
      if (admin.email === 'admin@gmail.com' ) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
    else {
      this.isLogin = false;
    }
  }
}
