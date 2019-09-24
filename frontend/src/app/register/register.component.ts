import { Component, OnInit, Output } from '@angular/core';

import {Router} from '@angular/router'

import {UsersService} from '../users.service';
import {User} from '../user.model';
import { ProviderAst } from '@angular/compiler';

import { sha256, sha224 } from 'js-sha256';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ime:  String
  prezime:  String;
  username: String;
  password:  string;
  password2:  String;
  mail:  string;
  zanimanje: String;
  jmbg:  String;
  pol: String;
  pitanje: String;
  odgovor: string;
  slikaUrl: string;

  slikaPrev: string;

  uspesno: Boolean;

  porime:  Boolean
  porprezime:  Boolean;
  porusername: Boolean;
  porpassword:  Boolean;
  porpassword2:  Boolean;
  poremail:  Boolean;
  porzanimanje: Boolean;
  porjmbg:  Boolean;
  porpol: Boolean;
  porpitanje: Boolean;
  porodgovor: Boolean;
  porpasswordprazno: Boolean;
  porusernameprazno: Boolean;
  porpassword2prazno: Boolean;
  porjmbgprazno: Boolean;
  poremailprazno:Boolean;
  porslika: Boolean;
  porslikaprazno: Boolean;

  upload:Boolean;


  constructor(private service:UsersService,private router: Router) { }

  ngOnInit() {
  this.uspesno=false;
   
  }

  onFileSelected(event: any){
    const image: any = event.target.files[0];
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
          
          if (img.width > 300 || img.height > 300) {
            this.porslika = true;
            this.upload = false;
            this.slikaPrev=null;
          } else {
            this.slikaPrev = this.slikaUrl;
            this.upload = true;
            this.porslika = false;
          }
      };
      this.slikaUrl = img.src = <string> fr.result; 
    };
    fr.readAsDataURL(image);
  }

  register():void{

    this.service.register(this.ime, this.prezime,
      this.username, sha224(this.password), this.mail,this.zanimanje,this.jmbg,
      this.pol,this.pitanje,sha224(this.odgovor),this.slikaUrl).subscribe((user: User)=>{
      if(user){
         this.clear();
         this.uspesno=true;
      }
    });
    
}

moze():void{

  //nedostaje probera za jmbg!

  this.clear();
  
  if(this.ime==null) this.porime=true;
  if(this.prezime==null) this.porprezime=true;
  if(this.mail==null)this.poremailprazno=true;
  if(this.username==null) this.porusernameprazno=true;
  if(this.jmbg==null)this.porjmbgprazno=true;
  if(this.pol==null)this.porpol=true;
  if(this.password==null)this.porpasswordprazno=true;
  if(this.password2==null)this.porpassword2prazno=true;
  if(this.pitanje==null)this.porpitanje=true;
  if(this.odgovor==null)this.porodgovor=true;
  if(this.zanimanje==null)this.porzanimanje=true;
  if(this.slikaUrl==null)this.porslikaprazno=true;

  const regex = /^[a-zA-Z][a-zA-Z0-9.]*@[a-z]+\.[a-z]+/;
  if (this.mail != null && regex.test(this.mail)==false) this.poremail=true;
  
  if(this.jmbg != null && !this.jmbgTest()) this.porjmbg=true;

  if(this.password != null && !this.passwordOK()) this.porpassword=true;

  if(this.password2!= null && this.password != this.password2) this.porpassword2=true;

  
   //username server find
   //pozive funkcija requsertest i register test radim jer mora da se saceka provera od servera!
   this.service.findUser(this.username).subscribe((user: User)=>{  

    if(user != null){
      console.log("user vec postoji");
      this.porusername=true;
    } 
   this.requsertest();
  });

 
}

requsertest():void{
  this.service.findRequser(this.username).subscribe((user: User)=>{  

    if(user != null){
      console.log("REQuser vec postoji");
      this.porusername=true;
    }
    this.registertest();
  });
}

registertest():void{
  if(this.sveOK()) this.register();

}

sveOK():Boolean{
  if(this.poremail==false &&
    this.poremailprazno==false&& 
    this.porusername==false && 
    this.porusernameprazno==false &&
     this.porime==false &&
     this.porjmbg==false &&
     this.porjmbgprazno==false&&
     this.porodgovor==false && 
     this.porzanimanje==false &&
   this.porpassword==false &&
   this.porpassword2==false &&
    this.porpassword2prazno==false &&
   this.porpasswordprazno==false &&
    this.porpitanje==false &&
    this.porpol==false &&
    this.porodgovor==false &&
    this.porslikaprazno==false &&
    this.porslika==false &&
    this.upload==true){
      console.log("SVE OK");
  return true;}
  return false;
}

passwordOK(): Boolean {
  if(this.password!=null){
  if (this.password.length < 8 || this.password.length > 12) 
    return false;
  
  let i,prev=null;
  let sameCharCount=0;
  let velika=0,mala=0,spec=0,broj=0;
  const c = this.password.charAt(0);
  if (!((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))) 
    return false;

  for (i = 0; i < this.password.length; i++) {
    const char = this.password.charAt(i);

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

jmbgTest():Boolean{
  let i,faktor=7;
  let sum=0;
  if(this.jmbg.length != 13) return false;
  for (i = 0; i < this.jmbg.length-1; i++) {
    const char = this.jmbg.charAt(i);
    if (!(char >= '0' && char <= '9')){
      return false;
    }
    
    if(i<6){
    sum+=faktor*Number(char);
   
    }else if(i==6){
      faktor = 7;
      sum+=faktor*Number(char);
    
    }else if(i>6){
      sum+=faktor*Number(char);
    
    }
    console.log(Number(char) ,'-', faktor,'-', i );
    --faktor;
  }
  console.log(sum);

  let m = sum % 11;
  if(m==0 && Number(this.jmbg.charAt(12))==0) return false;
  else if(m==1) return false;
  else {
    let k = 11-m;
    if(k==Number(this.jmbg.charAt(12))) return true;
    else return false;
  }
  
}

clear():void{
  this.porime=false;
  this.porprezime=false;
  this.poremailprazno=false;
  this.porusername=false;
  this.porusernameprazno=false;
  this.porjmbgprazno=false;
  this.porpol=false;
  this.porjmbg=false;
  this.porpasswordprazno=false;
  this.porpassword2prazno=false;
  this.porpitanje=false;
  this.porodgovor=false;
  this.porpassword=false;
  this.porpassword2=false;
  this.porusernameprazno=false;
  this.porzanimanje=false;
  this.poremail=false;
  this.porslikaprazno=false;
  this.porslika=false;


  

}

btnClick():void {
  this.router.navigate(['/login']);
};

}
