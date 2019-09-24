import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ShareService } from '../share.service';



@Component({
  selector: 'app-supervizor',
  templateUrl: './supervizor.component.html',
  styleUrls: ['./supervizor.component.css']
})
export class SupervizorComponent implements OnInit {

  zagonetka: String;
  resenje: String;

  porpoklapanje : Boolean;
  porslova: Boolean;
  porfajl: Boolean;

  uspesno: Boolean;

  constructor(private router: Router, private service: UsersService,private share : ShareService) { }

  ngOnInit() {
    let user;
    this.share.currtype.subscribe(value => user = value); 

    if( user !="super")
     this.router.navigate(['/login']);

    this.share.changeSup(true);
  }

  anagram():void{
   
    let zag, res;
    this.porpoklapanje=false;

    if(this.zagonetka==this.resenje) this.porpoklapanje=true;

    zag = this.zagonetka.replace(/\s/g, '');
    res =  this.resenje.replace(/\s/g, '');
    zag =zag.replace(/,/g, '');
    res = res.replace(/,/g, '');

    res=res.toLowerCase();
    zag = zag.toLowerCase();
    
    if(res.length!=zag.length) this.porpoklapanje=true;

    let niz1 = zag.split('');
    let niz2= res.split('');
    niz1.sort();
    niz2.sort();

    let i;
    for (i = 0; i < niz1.length; i++) 
        if (niz1[i] != niz2[i])
            this.porpoklapanje=true;
  
    if(!this.porpoklapanje){
      this.service.saveAnagram(this.zagonetka,this.resenje).subscribe((res: any)=>{
        if(res){
          this.uspesno=true;
        }
      });
    }


  }

  
  anagramFile(event) {
    this.porfajl=false;
    let file = event.srcElement.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = (evt: any) => {
            try {
                const reci = JSON.parse(evt.target.result);
          
                for (let anagram of reci.Anagrami) {
                      this.service.saveAnagram(anagram.zagonetka,anagram.resenje).subscribe((res) => {
                       
                        if (res) {
                          this.uspesno=true;
                        } 
                    });
                }
            } catch (e) {
              this.porfajl=true;
           
            }
        }
        reader.onerror = function (evt) {
            console.log('error reading file');
        }
    }else this.porfajl=true;
}


  btnClick():void{
    this.uspesno=false;
    this.zagonetka=null;
    this.resenje=null;
    this.porpoklapanje=false;
    this.porslova=false;

  }
}
