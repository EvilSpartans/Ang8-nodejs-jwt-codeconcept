import { Pipe, PipeTransform } from '@angular/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import * as frLocale from 'date-fns/locale/fr';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return formatDistanceToNow(new Date(value));
  }

}
