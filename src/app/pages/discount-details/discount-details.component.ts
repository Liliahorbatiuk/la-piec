import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {
  discount: IDiscount;
  constructor(private activatedRoute: ActivatedRoute,
              private discService: DiscountService,
              public location: Location) { }

  ngOnInit(): void {
    this.getDiscount();
  }

  private getDiscount(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(id);
    this.discService.getJSONOneDiscount(id).subscribe(
      data => {
        this.discount = data;
        console.log(this.discount);
      },
      err => {
        console.log(err);
      }
    );
  }

}
