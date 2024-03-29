import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseArray'
})
export class ReverseArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.slice().reverse();
  }

  /*transform(value) {
    return value.slice().reverse();
  }*/

}
