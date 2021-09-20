import { IProduct } from './product.interface';

export interface IOrder {
    products: Array<IProduct>;
    firstName: string;
    phone: string;
    city: string;
    street: string;
    house: string;
    totalPrice: number;
    comments: string;
    date: Date;
}


