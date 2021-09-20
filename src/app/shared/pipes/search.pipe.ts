import { Pipe, PipeTransform } from '@angular/core';
import { IBlog } from '../interfaces/blog.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IBlog>, field: string): Array<IBlog> {
    console.log(value, field);
    if (!field) {
      return value;
    }
    if (!value) {
      return [];
    }
    return value.filter(blog => blog.title.toLowerCase().includes(field.toLowerCase()));
  }

}
