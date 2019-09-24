import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ShareService } from '../share.service';
import { Igra } from '../igra.model';
import { Anagram } from '../anagram.model';
import { DatePipe } from '@angular/common';
import { Geografija } from '../geografija.model';
import { timer } from 'rxjs/observable/timer';
import { Termin } from '../termin.model';
import { Odgovor } from '../odgovor.model';


@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {

  private igra : Number;
  private res1 : String;
  private res2 : String;
  resenje1 : String;
  resenje2 : String;
  zagonetka1 : String;
  zagonetka2 : String;
  slovo:String;
  source : ConstantSourceNode;

  drzava : string;
  grad : string;
  reka : string;
  planina : string;
  jezero : string;
  biljka: string;
  zivotinja: string;
  muzika: string;

  private brojac : number;
  private poeni : number;
  
  private zapocni: Boolean;
  private kraj : Boolean;
  private obracunato : Boolean;
  private odigrano : Boolean;
  private sekund : Boolean;

  superodg : Array<Odgovor>=[];

  recidrz: Array<Termin>=[];
  recigr: Array<Termin>=[];
  recijez: Array<Termin>=[];
  reciplan: Array<Termin>=[];
  recireka: Array<Termin>=[];
  recibilj : Array<Termin>=[];
  reciziv: Array<Termin>=[];
  recimuz: Array<Termin>=[];

 user: String;
 username: String;

  br1 : Number;
  br2 : Number;
  br3 : Number;
  br4 : Number;
  dr1: Number;
  dr2: Number;
  tr: Number;
  dugme: Boolean;
  brojOdg : string;
  

  constructor(private router: Router, private service: UsersService, private share: ShareService
    ,private datePipe: DatePipe) { }

  ngOnInit() {
    this.dugme=false;
    
    this.sekund=false;
    this.share.currtype.subscribe(value => this.user = value); 
    this.share.currusername.subscribe(value => this.username = value); 

    if( this.user !="igrac")
     this.router.navigate(['/login']);
  
    //prvo proveri da nije vec igrao..
 
   
    this.zapocni= false;
    this.share.changeTakm(true);
    this.igra=0;
    var d = new Date();
    var dat = this.datePipe.transform(d, 'yyyy-MM-dd');
    
    this.odigrano=false;
    this.service.getRangs(dat,this.username).subscribe( (req: Igra) => {
      if(req){
        this.odigrano=true;

      }else{
        //proveri da se ne cekaju poeni slucajno, pa onda dohvati igru
        this.getProvera();
        this.dohvatiIgru();
      }

    });

      }

  getProvera():void{
    var d = new Date();
    var dat = this.datePipe.transform(d, 'yyyy-MM-dd');

    this.service.getProvera(dat,this.username).subscribe( (req: Igra) => {
      if(req){
        this.odigrano=true;
        this.obracunato=false;
      }else{
        //proveri da se ne cekaju poeni slucajno, pa onda dohvati igru
        this.dohvatiIgru();
      }

    });

  }

  dohvatiIgru():void{
    var d = new Date();
    var dat = this.datePipe.transform(d, 'yyyy-MM-dd');
 
    this.service.findIgra(dat).subscribe( (req: Igra) => {
      if(req){
       
        this.igra=req.igra; 
        if(this.igra == 3){
          this.res1=req.anagram1;
          this.res2=req.anagram2;
          this.dohvatiZagonetke();
          this.brojac= 60;
        }
        if(this.igra == 2){
            this.service.getGeos().subscribe( (res: Geografija[]) => {
              if(res){
                  let i =  Math.floor(Math.random() * Math.floor(res.length));
                  this.slovo = res[i].slovo;
              }
            }); 
            this.brojac= 120;
        }
        if(this.igra==1){
         
        }
      }
      console.log("nema igre");
    
  });

  }

  dohvatiZagonetke():void{
    this.service.findAnagram(this.res1).subscribe( (req: Anagram) => {
      if(req){
        this.zagonetka1=req.zagonetka;
    
      }
    
    });
  
    this.service.findAnagram(this.res2).subscribe( (req: Anagram) => {
      if(req){
        this.zagonetka2=req.zagonetka;
      }
  });

  }

  pocni():void{
    this.zapocni=true;
    //this.st.subscribe('1sec', () => this.callback());
    const source = timer(1000, 1000);
    source.subscribe(val => this.callback(source));
}
 
callback(source) {
  

    if(this.brojac >0)
       this.brojac--;

 if( this.brojac== 0){
      //kraj
      if(this.kraj!=true){
  this.sekund=true;
  console.log("sek");
  
  
    //izracunaj poene, zaustavi timer
   
    this.krajIgre();  
    this.brojac--;
      }

  }

}
unesiGeos():void{
  this.sekund=true;
  this.krajIgre();
}
  

  krajIgre():void{
    this.kraj=true;
    this.igra= -this.igra;

    this.poeni = 0;
    //izracunaj poene
    if(this.igra == -3){
      this.service.findAnagramResenje(this.zagonetka1).subscribe( (req: Anagram) => {
        if(req){
          if(this.resenje1 === req.resenje){
              this.poeni +=10;
          }
      }
           
      });
      this.service.findAnagramResenje(this.zagonetka2).subscribe( (req: Anagram) => {
        if(req){
          if(this.resenje2 === req.resenje){
              this.poeni +=10;
          }
        }
      });
      //treba zapamtiti poene u bazu!
       this.obracunato=true;
    }
    if(this.igra==-2){
      this.kraj=true;
      this.igra= -this.igra;

      this.poeni = 0;

      this.poeniGeos();
      
    }
    if(this.igra == -1){
   
      this.predajOdg();

    }

  }

  poeniGeos(): void {
   
    this.recidrz = this.stringUniz(this.drzava);   
    this.recigr = this.stringUniz(this.grad);
    this.recijez = this.stringUniz(this.jezero);
    this.recireka = this.stringUniz(this.reka);
    this.reciplan= this.stringUniz(this.planina);
    this.reciziv = this.stringUniz(this.zivotinja);
    this.recibilj = this.stringUniz(this.biljka);
    this.recimuz = this.stringUniz(this.muzika);

    this.rekurzivnodrz(0);
    //zovu jedna drugu kad zavrsi rekurzivno znanje zove se obracun


  }

  obracun(): void{
    if(this.superodg.length==0){
      this.obracunato=true;
      //sacuvaj u bazi u rang listu
     this.rangiraj();
    }else{
    //sacuvaj u bazi superodg i usera ---> za supervizora
      this.obracunato=false;
      this.posaljiOdgovore();
    }
  }

  rangiraj():void{
    var d = new Date();
    var dat = this.datePipe.transform(d, 'yyyy-MM-dd');
    this.service.saveRang(dat, this.poeni, this.igra,this.username).subscribe( (req: any) => {
      if(req){
        console.log("uspesno sacuvan rang");
      }});

  }

  posaljiOdgovore(){
    var d = new Date();
    var dat = this.datePipe.transform(d, 'yyyy-MM-dd');

    this.service.saveProvera(dat, this.slovo, this.username,this.superodg,this.poeni).subscribe( (req: any) => {
      if(req){
        console.log("uspesno poslato supervizoru");
      }});

  }



  rekurzivnodrz(j : any): void{
  
    if(j >= this.recidrz.length){
      this.rekurzivnogr(0);
      return;
    }else {
      this.service.findGeos(this.slovo,"drzava",this.recidrz[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.recidrz[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "drzava", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnodrz(j+1);
      });
 
    }
  }

  rekurzivnogr(j : any): void{
  
    if(j >= this.recigr.length){
      this.rekurzivnojez(0);
      return;
    }else {
      this.service.findGeos(this.slovo,"grad",this.recigr[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.recigr[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "grad", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnogr(j+1);
      });
 
    }
  }

  rekurzivnojez(j : any): void{
  
    if(j >= this.recijez.length){
      this.rekurzivnoreka(0);
      return;
    }else {
      this.service.findGeos(this.slovo,"jezero",this.recijez[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.recijez[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "jezero", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnojez(j+1);
      });
 
    }
  }

  rekurzivnoreka(j : any): void{
  
    if(j >= this.recireka.length){
      this.rekurzivnoplan(0);
      return;
    }else {
      this.service.findGeos(this.slovo,"reka",this.recireka[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.recireka[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "reka", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnoreka(j+1);
      });
 
    }
  }

  rekurzivnoplan(j : any): void{
  
    if(j >= this.reciplan.length){
      this.rekurzivnobilj(0);
      return;
    }else {
      this.service.findGeos(this.slovo,"planina",this.reciplan[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.reciplan[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "planina", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnoplan(j+1);
      });
 
    }
  }

  rekurzivnobilj(j : any): void{
  
    if(j >= this.recibilj.length){
      this.rekurzivnoziv(0);
      return;
    }else {
      this.service.findGeos(this.slovo,"biljka",this.recibilj[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.recibilj[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "biljka", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnobilj(j+1);
      });
 
    }
  }

  rekurzivnoziv(j : any): void{
  
    if(j >= this.reciziv.length){
      this.rekurzivnomuz(0);
      return;
    }else {
      this.service.findGeos(this.slovo,"zivotinja",this.reciziv[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.reciziv[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "zivotinja", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnoziv(j+1);
      });
 
    }
  }

  rekurzivnomuz(j : any): void{
  
    if(j >= this.recimuz.length){
      this.obracun();
      return;
    }else {
      this.service.findGeos(this.slovo,"muzika",this.recimuz[j].termin).subscribe( (req: any) => {
        if(req){
          this.poeni+=2;
        }
        else{
          let superTer : Array<Termin>=[];
          var termin : Termin = {termin : this.recimuz[j].termin}
          superTer.push(termin);
          var odgovor : Odgovor = {kategorija : "muzika", termini: superTer}
          this.superodg.push(odgovor);
        }
        this.rekurzivnomuz(j+1);
      });
 
    }
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


   stop(): void{
     if(this.br1==null){
      this.br1 =  Math.floor(Math.random() * Math.floor(9))+1;
      return;
     }
     if(this.br2==null){
      this.br2 =  Math.floor(Math.random() * Math.floor(9))+1;
      return;
     }
     if(this.br3==null){
      this.br3 =  Math.floor(Math.random() * Math.floor(9))+1;
      return;
     }
     if(this.br4==null){
      this.br4 =  Math.floor(Math.random() * Math.floor(9))+1;
      return;
     }
     if(this.dr1==null){
       let i = [10,15,20];
      this.dr1 = i[Math.floor(Math.random() * Math.floor(i.length))];
      return;
     }
     if(this.dr2==null){
      let i = [25,50,75,100];
     this.dr2 = i[Math.floor(Math.random() * Math.floor(i.length))];
     return;
    }
     if(this.tr==null){
      this.tr =  Math.floor(Math.random() * Math.floor(999))+1;
      this.dugme = true;
      this.brojac= 60;
      return;
     }
    
   }

   predajOdg():void{
    this.kraj=true;
    try {
     let str = eval(this.brojOdg); 
     if(str == this.tr){
    
      this.poeni=10;
      this.rangiraj();
    }   else {
       this.poeni=0;
       this.rangiraj();
 
    }

  } catch (e) {
    this.rangiraj();
    this.poeni=0;
  
  }
  
   }

}
