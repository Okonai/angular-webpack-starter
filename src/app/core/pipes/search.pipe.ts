import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'highlightQuery'})
export class HighlightQueryString implements PipeTransform {
  transform(value: string, query:any): string {
    var pattern = new RegExp(query, 'gi');
    var str = value.replace(pattern, '<span class="query">' + query +'</span>');
    return str;
  }
}
