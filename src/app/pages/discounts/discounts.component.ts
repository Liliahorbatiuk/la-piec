import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {
  userDiscounts: Array<IDiscount> = [];
  constructor(private disService: DiscountService) { }

  ngOnInit(): void {
    this.getDiscount();
  }

  // getDiscount(): void {
  //   this.userDiscounts = this.disService.getDiscounts();
  // }

  getDiscount(): void {
    this.disService.getJSONDiscounts().subscribe(
      data => {
        this.userDiscounts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
