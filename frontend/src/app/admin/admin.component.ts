import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {UsersService} from '../users.service';
import {User} from '../user.model';
import {Request} from '../request.model';

import { ShareService } from '../share.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  requests : Request[];
   curr : Request;
  prikazi : Boolean;

  constructor(private router: Router, private service: UsersService, private share: ShareService) { }

  ngOnInit() {
    let user;
    this.share.currtype.subscribe(value => user = value); 
  
      if( user !="admin")
        this.router.navigate(['/login']);

    this.share.changeAdmin(true);
    this.refresh();
   this.prikazi=true;
  }
  refresh():void{
    this.service.getRequests().subscribe( (req: any) => {
      this.requests = req;
  });
  }

  prihvati(req: Request):void{
      this.prikazi=false;
      this.curr=req;
      this.service.getAndRemoveRequser(this.curr.username).subscribe( (req: any) => {
        this.refresh();
        if(req!=null)
        this.sacuvaj(req);
      });
     
  }
  sacuvaj(req:Request){
this.service.saveUser(req.ime, req.prezime,
  req.username, req.password, req.mail,req.zanimanje,req.jmbg,
  req.pol,req.pitanje,req.odgovor).subscribe( (req: any) => {
   
  });
  }

  odbij(req:Request):void{
    this.prikazi=false;
    this.curr=req;
    this.service.removeRequestUser(this.curr.username).subscribe( (req: any) => {
      this.refresh();
    });
    //brisi po username!
    //pozovi metodu koja ce da obrise req iz requestusers
    
  }

  detaljno(req:Request):void{
    
    this.curr=req;
    this.prikazi=true;

}
  zatvori( ):void{
    this.prikazi=false;
  }

}
