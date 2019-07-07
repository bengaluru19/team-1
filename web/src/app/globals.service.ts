import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  static invalid;
  constructor() {
    GlobalsService.invalid = 1; 
  }

  setInvalid(){
    GlobalsService.invalid = 1;
  }

  unsetInvalid(){
    GlobalsService.invalid = 0;
  }

}
