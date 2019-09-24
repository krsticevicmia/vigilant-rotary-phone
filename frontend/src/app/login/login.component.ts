import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {UsersService} from '../users.service';
import {User} from '../user.model';
import { ShareService } from '../share.service';

import { sha256, sha224 } from 'js-sha256';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: string;

  porusername:Boolean;
  porpassword:Boolean;
  poroldpass:Boolean;
  porpoklapanje: Boolean;
  promena:Boolean;
  poruserpass:Boolean;

  newpass: string;
  newpass2:string;
  oldpass:string;

  constructor(private router: Router, private service: UsersService,private share : ShareService) { }

  ngOnInit() {
   

    this.porusername=false;
    this.porpassword=false;
    this.poroldpass=false;
    this.porpoklapanje=false;
    this.promena=false;
  }

  login():void{

    this.poruserpass=false;

    this.service.login(this.username, sha224(this.password)).subscribe((user: User)=>{
      if(user){
        //treba voditi racuna koji meni ce se pozvati u zavisnoti od toga koji tip korisnika
        //se ulogovao! 
        //i naravno navigirati na stranicu koja je za tog usera pocetna
        // kod admina
        /*if(user[0].type=='user'){
          this.share.changeSup(true);
          this.router.navigate(['/user']);
        } 
        else*/
      
        if(user.tip==0){
         
          this.share.setType("igrac");
          this.share.setUsername(user.username);
          this.router.navigate(['/igrac']);
        }
        
      
        if(user.tip==1){
          this.share.setType("super");
          this.share.setUsername(user.username);
          this.share.changeSup(true);
          this.router.navigate(['/supervizor']);
        }     
        if(user.tip==2){
          console.log("pustio");
          this.share.setType("admin");
          this.share.setUsername(user.username);
          this.share.changeAdmin(true);
          this.router.navigate(['/admin']);
          console.log("pustio admin");
        }
       
      }else{
        this.poruserpass=true;
      }
     
    });
  }

  promeni():void{
    this.porusername=false;
    this.porpassword=false;
    this.poroldpass=false;
    this.porpoklapanje=false;
    //proveriti da li je uneto sve
    if(this.username != null && this.oldpass!=null && this.newpass!=null && this.newpass2!=null){
        if(this.passwordOK()){
          if(this.newpass==this.newpass2){
            this.service.findUser(this.username).subscribe((user: User)=>{
              if(user){
                if(user.password==sha224(this.oldpass)){
                  this.promenipass();
                }else{
                  
                  this.poroldpass=true;
                }
                 
              }else{
                this.porusername=true;
              }
            });
          }else{
            this.porpoklapanje=true;
          }
        }else{
          this.porpassword=true;
        }
    }

    

  }

  promenipass(){
    this.service.changePass(this.username,sha224(this.newpass)).subscribe((user: User)=>{
      if(user){
        this.porpassword=false;
        this.porusername=false;
        this.promena=false;
      }
    });

  }

  promenaTrue(){
    this.promena=true;
  }
 
  //promena lozinke!
  passwordOK(): Boolean {
    if(this.newpass!=null){
    if (this.newpass.length < 8 || this.newpass.length > 12) 
      return false;
    
    let i,prev=null;
    let sameCharCount=0;
    let velika=0,mala=0,spec=0,broj=0;
    const c = this.newpass.charAt(0);
    if (!((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))) 
      return false;
  
    for (i = 0; i < this.newpass.length; i++) {
      const char = this.newpass.charAt(i);
  
      if (char >= 'A' && char <= 'Z') {
        velika++;
      }else  if ( char >= '0' && char <= '9') {
        broj++;
      }else  if (char >= 'a' && char <= 'z') {
       mala++;
      }else spec++;
  
      
      if (prev !=null && prev== char) {
        sameCharCount++;
        if (sameCharCount > 2) {
          return false;
        }
      } else {
        prev = char;
        sameCharCount = 1;
      }
    }
    if (velika <1  || mala < 3 || broj <1 || spec < 1) return false;
    return true;
  } return false;
  
  }
  
clear():void{
  this.poroldpass=false;
  this.porpassword=false;
  this.porpoklapanje=false;
  this.porusername=false;
  this.promena=false;
  this.username=null;
  this.password=null;
  this.oldpass=null;
  this.newpass=null;
  this.newpass2=null;
  this.share.setType("");
  this.share.setUsername("");
}

}
