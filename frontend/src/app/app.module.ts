import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './users.service';

import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { SupervizorComponent } from './supervizor/supervizor.component';
import { SuperGeoComponent } from './super-geo/super-geo.component';
import { AdminIgraComponent } from './admin-igra/admin-igra.component';
import { IgracComponent } from './igrac/igrac.component';
import { DatePipe } from '@angular/common';
import { SuperPojamComponent } from './super-pojam/super-pojam.component';
import { IgracRangComponent } from './igrac-rang/igrac-rang.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    NavComponent,
    SupervizorComponent,
    SuperGeoComponent,
    AdminIgraComponent,
    IgracComponent,
    SuperPojamComponent,
    IgracRangComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsersService,
              DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
