import { Component, OnInit } from '@angular/core';
import { Anagram } from '../anagram.model';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ShareService } from '../share.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-igra',
  templateUrl: './admin-igra.component.html',
  styleUrls: ['./admin-igra.component.css']
})
export class AdminIgraComponent implements OnInit {
//UKOLIKO NIKO JOS NIKO NIJE ODIGRAO IGRU DANA OMOGUCITI AZUZIRANJE
  value: String;
  igra : Number;

  poruka: Boolean;
  poruka2 : Boolean;
  anagram : Boolean;
  uspesno: Boolean;
  zauzeto : Boolean;

  anagrami : Anagram[];

  izabraniA1: String;
  izabraniA2 : String;

  datum : Date;

  constructor(private router: Router, private service: UsersService, private share: ShareService
    ,private datePipe: DatePipe) { }

  ngOnInit() {
    let user;
    this.share.currtype.subscribe(value => user = value); 

    if( user !="admin")
     this.router.navigate(['/login']);

    this.share.changeAdmin(true);
    this.poruka=false;
    this.service.getAnagrams().subscribe( (req: Anagram[]) => {
    if(req)
      this.anagrami = req;
     console.log(this.anagrami);
    });
  }

  onItemSelected():void{
      if( this.igra ==3) this.anagram = true;
      else this.anagram=false;
  }

  unesi():void{
    this.clear();
    if((this.izabraniA1==null || this.izabraniA2 == null) && this.anagram==true){
      this.poruka2=true;
      return;
    }
   if(this.datum == null) {
    this.poruka2=true;
    return;
   }
   this.service.findDate(this.datum)
     .subscribe((res)=>{
       if(res == null){
        this.zauzeto=false;
         this.unesi2();
         
       }else{
         this.zauzeto=true;
       }
     });
  }

  unesi2():void{
    //datum se sad prosledjuje kao string, a tamo u ikrac komponenti se uzme currDate i transform
    //ise sa dataPipe i bude sve ok!!
    console.log("\n",this.datum);
  
   
    if(this.anagram == true){
        //sacuvaj igru datum izabrani 1 i izbrani 2
        this.service.saveIgra(this.igra,this.izabraniA1,
        this.izabraniA2, this.datum)
        .subscribe((res)=>{
          if(res){
            this.uspesno=true;
            this.anagram=false;
          }
        });
    }else{
        if(this.igra !=null && this.datum){
          this.service.saveIgra(this.igra,this.izabraniA1,
            this.izabraniA2, this.datum)
        .subscribe((res)=>{
          if(res){
            this.uspesno=true;
            this.anagram=false;
          }
        });
        }
    }

  }
  clear():void{
    this.poruka =false;
    this.poruka2 =false;
  }

  btnClick():void{
    this.uspesno=false;
    this.igra=null;
    this.datum=null;
    this.izabraniA1=null;
    this.izabraniA2=null;

  }

}
