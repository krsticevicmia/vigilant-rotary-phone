import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ShareService } from '../share.service';
import { Provera } from '../provera.model';
import { Odgovor } from '../odgovor.model';


@Component({
  selector: 'app-super-pojam',
  templateUrl: './super-pojam.component.html',
  styleUrls: ['./super-pojam.component.css']
})
export class SuperPojamComponent implements OnInit {

  pojmovi : Array<Provera>;
  odobreni : Array<number>=[];

  prazno : Boolean;

  constructor(private router: Router, private service: UsersService, private share: ShareService) { }

  ngOnInit() {
    let user;
    this.share.currtype.subscribe(value => user = value); 

    if( user !="super")
     this.router.navigate(['/login']);

    this.share.changeSup(true);

    this.service.getProveras().subscribe( (req: Provera[]) => {
      this.pojmovi = req;
      if(this.pojmovi.length==0) this.prazno =true;
      else this.prazno=false; 
    });

  }

  dodajPoene(odg: Odgovor, pojam : Provera, ind : number ):void{
     
    let odbr=false;
    for(let i = 0; i<this.odobreni.length; i++){
        if(this.odobreni[i]==ind)
          odbr = true;
    }
    if(!odbr){

      let poeni = pojam.poeni+4;

     this.service.updateProvera(pojam.datum,pojam.username,poeni).subscribe( (req: Provera) => {
          if(req){
            this.service.getProveras().subscribe( (req: Provera[]) => {
              this.pojmovi = req;
              if(this.pojmovi.length==0) this.prazno =true;
              else this.prazno=false; 
            });
          }
     });
     this.odobreni.push(ind);
    }
  }

  zavrsi(provera : Provera):void{
    this.service.saveRang(provera.datum, provera.poeni, 2, provera.username).subscribe( (req: any) => {
      if(req){
        console.log("uspesno sacuvan rang");
        this.service.removeProvera(provera.datum, provera.username).subscribe( (req: any) => {
          if(req){
            console.log("uspesno obrisana provera");
            this.service.getProveras().subscribe( (req: Provera[]) => {
              this.pojmovi = req;
              if(this.pojmovi.length==0) this.prazno =true;
              else this.prazno=false; 
            });
          }});
      }});
  }
}
