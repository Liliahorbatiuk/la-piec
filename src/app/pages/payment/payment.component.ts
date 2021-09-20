import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  arrBlog: Array<IBlog> = [
    {
      id: 1,
      title: 'Arsenal win APL',
      text: 'some text some text',
      count: 1000000,
      date: new Date(2021, 5, 27, 16, 0, 0)
    },
    {
      id: 2,
      title: 'Chelsea lo0se APL',
      text: 'some text some text',
      count: 50.4567,
      date: new Date(2021, 5, 26, 16, 0, 0)
    }
  ];
  price = '699';
  searchName: string;
  constructor() { }

  ngOnInit(): void {
  }

}

