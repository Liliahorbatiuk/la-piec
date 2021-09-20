import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Order } from 'src/app/shared/classes/order.model';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IProfile } from 'src/app/shared/interfaces/profile.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: Array<IProduct> = [];
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  totalPayment: string;
  userComment: string;
  totalPrice = 0;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getLocalProducts();
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

  productCount(product: IProduct, status: boolean): void {
    if (status){
      product.count++;
    }
    else{
      if (product.count > 1){
        product.count--;
      }
    }
    this.totalPrice = this.getTotal(this.basket);
    this.orderService.basket.next(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  removeProduct(product: IProduct): void {
    if (confirm('Are you sure?')){
      const index = this.basket.findIndex(prod => prod.id === product.id);
      this.basket.splice(index, 1);
      this.totalPrice = this.getTotal(this.basket);
      this.orderService.basket.next(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }
  }

  addOrder(): void {
    const order = new Order(
      this.basket,
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.totalPrice,
      this.userComment);
    if (localStorage.getItem('user')){
      
    }  
    this.orderService.create(order).then(
      () => {
        this.basket = [];
        localStorage.removeItem('basket');
        this.orderService.basket.next();
    });
  }

  checkUserLogin(): void{
    if (localStorage.getItem('user')){
      const user: IProfile = JSON.parse(localStorage.getItem('user'));
      this.userName = user.firstName;
      this.userPhone = user.phone;
      this.userCity = user.city;
      this.userStreet = user.street;
      this.userHouse = user.house;
    }
  }


}
