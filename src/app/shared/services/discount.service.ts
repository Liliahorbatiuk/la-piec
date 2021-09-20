import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscount } from '../interfaces/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discounts: Array<IDiscount> = [
    {
      id: 1,
      title: 'Наша фірмова акція “2+1”',
      text: `Акція «2+1» діє в понеділок, вівторок, середу та четвер. Замовляйте дві піци та отримуйте ще одну безкоштовно!
      * Безкоштовною вважається піца з найменшою вартістю.
      ** Ця акція не поєднується з іншими акціями.`,
      image: 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg',
      visibility: true
    }
  ];
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/discounts';
  }

  getDiscounts(): Array<IDiscount> {
    return this.discounts;
  }

  setDiscounts(newD: IDiscount): void {
    this.discounts.push(newD);
  }

  deleteDiscount(id: number | string): void {
    const index = this.discounts.findIndex(d => d.id === id);
    this.discounts.splice(index, 1);
  }

  updateDiscount(discount: IDiscount): void {
    const index = this.discounts.findIndex(d => d.id === discount.id)
    this.discounts.splice(index, 1, discount);
  }

  getJSONDiscounts(): Observable<Array<IDiscount>>{
    return this.http.get<Array<IDiscount>>(this.url);
  }

  postJSONDiscount(discount: IDiscount): Observable<IDiscount>{
    return this.http.post<IDiscount>(this.url, discount);
  }

  updateJSONDiscount(discount: IDiscount): Observable<IDiscount>{
    return this.http.put<IDiscount>(`${this.url}/${discount.id}`, discount);
  }

  deleteJSONDiscount(discount: IDiscount): Observable<IDiscount> {
    return this.http.delete<IDiscount>(`${this.url}/${discount.id}`);
  }

  getJSONOneDiscount(id: number | string): Observable<IDiscount> {
    return this.http.get<IDiscount>(`${this.url}/${id}`);
  }

}
