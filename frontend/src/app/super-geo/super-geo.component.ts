import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ShareService } from '../share.service';
import { Termin } from '../termin.model';
import { Odgovor } from '../odgovor.model';
import { Geografija } from '../geografija.model';
import { concat } from 'rxjs';

@Component({
  selector: 'app-super-geo',
  templateUrl: './super-geo.component.html',
  styleUrls: ['./super-geo.component.css']
})
export class SuperGeoComponent implements OnInit {

  
  
    slovo: string;
    drzava: string;
    grad: string;
    jezero: string;
    planina: string;
    reka: string;
    biljka : string;
    zivotinja: string;
    muzika: string;
  
    jednoSlovo : Boolean;
    nemaSlova: Boolean;
    porfajl: Boolean;
  
    uspesno: Boolean;

    niz : any;
    duzina : Number;
  
    constructor(private router: Router, private service: UsersService,private share : ShareService) { }

    ngOnInit() {
      let user;
      this.share.currtype.subscribe(value => user = value); 
  
      if( user !="super")
       this.router.navigate(['/login']);

      this.share.changeSup(true);
    }
   
  
    unesi():void{
      this.jednoSlovo=false;
      const regex = /^[a-zA-Z]$/;
      if(regex.test(this.slovo)==false) {
          this.jednoSlovo=true;
      } else{
        //dohvati pa onda ako je null zovi napravi pojam ako nije null onda
        // na to dohvaceno dodaj sve ono
  
      if(this.moze()){

        this.service.getGeografija(this.slovo).subscribe((geo: Geografija)=>{  
            if(geo){
              this.updejtujPojam(geo);
            }else{
              this.napraviPojam();
            }
        });
  
      }
    }
    }

    updejtujPojam(geo : Geografija):void{

      let termini: Array<Termin> =[];
    
      termini = this.stringUniz(this.drzava);
    
      termini.push(...geo.odgovori[0].termini);
      if(termini.length!=0 || geo.odgovori[0].termini.length != 0) 
      var odgovorDrzava : Odgovor = {kategorija: 'drzava',
                                    termini : termini }

      termini = this.stringUniz(this.grad);
      if(termini.length!=0 || geo.odgovori[1].termini.length != 0) 
      termini.push(...geo.odgovori[1].termini);
      var odgovorGrad : Odgovor = {kategorija: 'grad',
                                    termini : termini }
         
      termini= this.stringUniz(this.planina);
      if(termini.length!=0 || geo.odgovori[2].termini.length != 0) 
      termini.push(...geo.odgovori[2].termini);
      var odgovorPlanina : Odgovor = {kategorija: 'planina',
                                    termini : termini }
         
      termini= this.stringUniz(this.jezero);
      if(termini.length!=0 || geo.odgovori[3].termini.length != 0) 
      termini.push(...geo.odgovori[3].termini);
      var odgovorJezero : Odgovor = {kategorija: 'jezero',
                                    termini : termini }

      termini= this.stringUniz(this.reka);
      if(termini.length!=0 || geo.odgovori[4].termini.length != 0) 
      termini.push(...geo.odgovori[4].termini);
      var odgovorReka : Odgovor = {kategorija: 'reka',
                                    termini : termini }
         
      termini= this.stringUniz(this.biljka);
      if(termini.length!=0 || geo.odgovori[5].termini.length != 0) 
      termini.push(...geo.odgovori[5].termini);
      var odgovorBiljka : Odgovor = {kategorija: 'biljka',
                                    termini : termini }
    
      termini= this.stringUniz(this.zivotinja);
      if(termini.length!=0 || geo.odgovori[6].termini.length != 0) 
      termini.push(...geo.odgovori[6].termini);
      var odgovorZivotinja : Odgovor = {kategorija: 'zivotinja',
                                    termini : termini }
      
      termini= this.stringUniz(this.muzika);
      if(termini.length!=0 || geo.odgovori[7].termini.length != 0) 
      termini.push(...geo.odgovori[7].termini);
      //console.log("geo ",termini[0].termin);
      var odgovorMuzika : Odgovor = {kategorija: 'muzika',
                                    termini : termini }
    
    var odgovori : Array<Odgovor>=[];
    odgovori.push(odgovorDrzava);
    odgovori.push(odgovorGrad);
    odgovori.push(odgovorJezero);
    odgovori.push(odgovorPlanina);
    odgovori.push(odgovorReka);
    odgovori.push(odgovorBiljka);
    odgovori.push(odgovorZivotinja);
    odgovori.push(odgovorMuzika);

    this.service.updateGeogafija(this.slovo, odgovori).subscribe((geo: Geografija)=>{  
    
    if(geo)  this.uspesno=true;
    });

    }

    napraviPojam():void{
    
     let termini: Array<Termin> =[];
 
        termini = this.stringUniz(this.drzava);
        var odgovorDrzava : Odgovor = {kategorija: 'drzava',
                                      termini : termini }

        termini = this.stringUniz(this.grad);
        var odgovorGrad : Odgovor = {kategorija: 'grad',
                                      termini : termini }
           
        termini= this.stringUniz(this.planina);
        var odgovorPlanina : Odgovor = {kategorija: 'planina',
                                      termini : termini }
           
        termini= this.stringUniz(this.jezero);
        var odgovorJezero : Odgovor = {kategorija: 'jezero',
                                      termini : termini }

        termini= this.stringUniz(this.reka);
        var odgovorReka : Odgovor = {kategorija: 'reka',
                                      termini : termini }
           
        termini= this.stringUniz(this.biljka);
        var odgovorBiljka : Odgovor = {kategorija: 'biljka',
                                      termini : termini }
      
        termini= this.stringUniz(this.zivotinja);
        var odgovorZivotinja : Odgovor = {kategorija: 'zivotinja',
                                      termini : termini }
        
        termini= this.stringUniz(this.muzika);
        var odgovorMuzika : Odgovor = {kategorija: 'muzika',
                                      termini : termini }
      
      var odgovori : Array<Odgovor>=[];
      odgovori.push(odgovorDrzava);
      odgovori.push(odgovorGrad);
      odgovori.push(odgovorJezero);
      odgovori.push(odgovorPlanina);
      odgovori.push(odgovorReka);
      odgovori.push(odgovorBiljka);
      odgovori.push(odgovorZivotinja);
      odgovori.push(odgovorMuzika);

      this.service.insertGeografija(this.slovo, odgovori).subscribe((user: any)=>{  
          this.uspesno=true;
      });

      
    }
      
   stringUniz(str: string): Array<Termin>{
    let termini: Array<Termin>=[];
    let i;
   
    const regex = /^[a-zA-Z- ]+(?:,[a-zA-Z ]+)*$/;
    if (str == null || regex.test(str)==false) return termini;
    var splitted = str.split(","); 
    for(i=0; i < splitted.length; i++){

      var termin : Termin = {termin : splitted[i]}
      termini.push(termin);
    }

     return termini;
   }
      
    moze():Boolean{
      if(this.slovo==null &&
        this.drzava==null &&
         this.grad==null&& 
         this.planina==null && 
         this.reka==null &&
         this.jezero==null &&
         this.biljka==null &&
         this.zivotinja==null&&
         this.muzika==null) 
        return false;
      
      return true;
    }
    
   geoFile(event) {
      this.porfajl=false;
      let file = event.srcElement.files[0];
      if (file) {
          const reader = new FileReader();
          reader.readAsText(file, 'UTF-8');
          reader.onload = (evt: any) => {
              try {
                  const reci = JSON.parse(evt.target.result);
                  console.log(reci);

                  this.niz = reci.Geografija;
                  this.duzina = reci.Geografija.length;
                  this.rekurzivno(0);

  
              } catch (e) {
                this.porfajl=true;
               
              }
          }
          reader.onerror = function (evt) {
              console.log('error reading file');
          }
      }else this.porfajl=true;
  }

  rekurzivno(j : any): void{
  
      if(j >= this.duzina || this.niz == null){
        return;
      }else {
        this.service.getGeografija(this.niz[j].slovo).subscribe((geos: Geografija)=>{  
          
          let odgovori: Array<Odgovor> =[];
          let termini: Array<Termin> =[];
          if(geos){
            let i  = 0;
            for (let odg of this.niz[i].odgovori) {
        
              termini= this.stringUniz(odg.termin);
              if(termini.length!=0 || geos.odgovori[i].termini.length != 0) 
              termini.push(...geos.odgovori[i].termini);
              var odgovor : Odgovor = {kategorija: odg.kategorija,
                                            termini : termini }     
              odgovori.push(odgovor);
              i++;
        
             } 
             this.service.updateGeogafija(this.niz[j].slovo, odgovori).subscribe((res: any)=>{  
              if(res){
                this.uspesno=true;
                this.rekurzivno(j+1);
              }
                
            });

          }else{

            for (let odg of this.niz[j].odgovori) {
      
              termini= this.stringUniz(odg.termin);
              var odgovor : Odgovor = {kategorija: odg.kategorija,
                                            termini : termini }     
              odgovori.push(odgovor);
        
           }
           this.service.insertGeografija(this.niz[j].slovo, odgovori).subscribe((res: any)=>{  
            if(res){
              this.uspesno=true;
              this.rekurzivno(j+1);
            }
              
          });


      }
  });
}
}


  
 
  
    btnClick():void{
      //brisi
      this.uspesno=false;
      this.drzava=null;
      this.grad=null;
      this.jezero=null;
      this.planina=null;
      this.reka=null;
      this.biljka= null;
      this.zivotinja=null;
      this.muzika=null;
      this.slovo=null;
      this.nemaSlova=false;
      this.jednoSlovo=false;
  
    }
  
  

}
