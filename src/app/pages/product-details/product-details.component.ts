import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  view = null;
  constructor(private orderService: OrderService,
              private prodService: ProductsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.prodService.getOne(name).onSnapshot(
      document => {
        document.forEach(prod => {
          const product = {
            id: prod.id,
            ...prod.data() as IProduct
          };
          this.view = product;
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
