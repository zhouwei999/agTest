import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'screencity'
})
export class ScreencityPipe implements PipeTransform {

  transform(values: any, filter: string) {
    if(filter){
      if(values.indexOf(filter)>-1){
        return values
      }
    }else{
      return values
    }
  }

}
