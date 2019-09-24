import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private supervizor = new BehaviorSubject<Boolean>(false);
  currSupervizor = this.supervizor.asObservable();

  private admin = new BehaviorSubject<Boolean>(false);
  currAdmin = this.admin.asObservable();

  private takmicar = new BehaviorSubject<Boolean>(false);
  currTakmicar = this.takmicar.asObservable();

  private login = new BehaviorSubject<Boolean>(false);
  currlogin = this.login.asObservable();

  private username = new BehaviorSubject<String>("");
  currusername = this.username.asObservable();

  private type = new BehaviorSubject<String>("");
  currtype = this.type.asObservable();

  constructor() { }

  setType(t : String){
    this.type.next(t);
  }

  setUsername(user : String){
    this.username.next(user);
  }

  changeSup(message : Boolean){
      this.supervizor.next(message);
      this.login.next(true);
      this.takmicar.next(false);
      this.admin.next(false);
  }

  changeTakm(message : Boolean){
    this.takmicar.next(message);
    this.login.next(true);
    this.supervizor.next(false);
    this.admin.next(false);
}

changeAdmin(message : Boolean){
  this.admin.next(message);
  this.login.next(true);
  this.takmicar.next(false);
  this.supervizor.next(false);
}

changeLogin(message : Boolean){
  this.login.next(message);
}

changeLogout(){
  this.login.next(false);
  this.admin.next(false);
  this.supervizor.next(false);
  this.takmicar.next(false);
}
}
