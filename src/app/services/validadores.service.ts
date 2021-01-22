import { invalid } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeUsuario(control:FormControl):  Promise<ErrorValidate> | Observable<ErrorValidate>{
    if(!control.value){
      return Promise.resolve(null);
    }
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
          if(control.value === 'strider'){
            resolve({ existe: true});
          }else{
            resolve(null)
          }
        },1500);
    });
  }

  noHerrera(control:FormControl):ErrorValidate {
    if(control.value?.toLowerCase() === 'herrera'){
      console.log(control);
    return {
      noHerrera:true
    }
    }
    return null;
    
  }

  passIguales(pass1Name:string,pass2Name:string){
    return (formGroup:FormGroup) =>{
      const pass1CONTROL = formGroup.controls[pass1Name];
      const pass2CONTROL = formGroup.controls[pass2Name];

      if( pass1CONTROL.value === pass2CONTROL.value){
        pass2CONTROL.setErrors(null);
      }else{
        pass2CONTROL.setErrors({noIguales:true})
      }
    }
  }

}
