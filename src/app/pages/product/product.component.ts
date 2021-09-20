import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  currentCategory: string;
  constructor(private prodService: ProductsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd){
        const category = this.activatedRoute.snapshot.paramMap.get('category');
        this.getProducts(category);
      }
    });
  }

  ngOnInit(): void { }

  private getProducts(category: string): void {
    this.products = [];
    this.prodService.getAllCategory(category).onSnapshot(
      document => {
        document.forEach(prod => {
          const product = {
            id: prod.id,
            ...prod.data() as IProduct
          };
          this.currentCategory = product.category.name;
          this.products.push(product);
        });
      }
    );
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
  }

  addToBasket(product: IProduct): void {
    this.orderService.addBasket(product);
    product.count = 1;
  }
}
