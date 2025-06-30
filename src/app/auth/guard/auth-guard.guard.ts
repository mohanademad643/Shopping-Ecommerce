import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)
  const localData = localStorage.getItem("token");
  if(localData != null && localData != undefined){
    return true;
  }else{
    router.navigate(['/enter/signtin']);
      return false;
  }
};
