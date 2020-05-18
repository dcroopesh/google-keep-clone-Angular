import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'displayNote'
})
export class DisplayNotePipe implements PipeTransform {

  transform(noteObjects : [],searchText : string){

  if (! noteObjects) return [];
    return noteObjects.filter(note => JSON.stringify(note['title']).toLowerCase().indexOf(searchText) > -1 );
  
  }
}
