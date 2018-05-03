import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vacant'
})
export class VacantPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Vacant' : 'Occupied';
  }

}
