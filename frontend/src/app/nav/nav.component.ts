import { Component, OnInit } from '@angular/core';
import {ShareService} from '../share.service';
import {Router} from '@angular/router'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  supervizor: Boolean = false;
  login: Boolean = false;
  admin: Boolean = false;
  takmicar: Boolean = false;
  username: String = "";

  constructor(private share : ShareService,private router: Router) { }

  ngOnInit() {
    this.share.currSupervizor.subscribe(message => this.supervizor = message);
    this.share.currAdmin.subscribe(message => this.admin = message);
    this.share.currTakmicar.subscribe(message => this.takmicar = message);
    this.share.currlogin.subscribe(message => this.login = message);
    this.share.currusername.subscribe(message => this.username = message);
  }

  logout(){
    this.share.setType("");
    this.share.setUsername("");
    this.share.changeLogout();
    this.router.navigate(['/login']);
  }

}
