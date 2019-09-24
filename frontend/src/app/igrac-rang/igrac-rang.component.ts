import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ShareService } from '../share.service';
import { DatePipe } from '@angular/common';
import { Rang } from '../rang.model';

@Component({
  selector: 'app-igrac-rang',
  templateUrl: './igrac-rang.component.html',
  styleUrls: ['./igrac-rang.component.css']
})
export class IgracRangComponent implements OnInit {

  rangs : Array<Rang>

  constructor(private router: Router, private service: UsersService, private share: ShareService,
    private datePipe: DatePipe) { }
    //dohvati ime user a i ako je to  onda da oboji red !!!
  ngOnInit() {
    var d = new Date();
    var dat = this.datePipe.transform(d, 'yyyy-MM-dd');
    this.service.getRangovi(dat).subscribe( (req: Rang[]) => {
      if(req){
        this.rangs=req;
        this.rangs.sort((a, b) => (a.poeni > b.poeni) ? 1 : -1);

      }

    });
  }

}
