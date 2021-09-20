import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnia'
})
export class HryvniaPipe implements PipeTransform {

  transform(value: string): string {
    if (!value){
      return '';
    }
    return value + ' ₴';
  }

}