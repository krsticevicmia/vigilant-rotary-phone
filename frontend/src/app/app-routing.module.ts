import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { SupervizorComponent } from './supervizor/supervizor.component';
import { SuperGeoComponent } from './super-geo/super-geo.component';
import { AdminIgraComponent } from './admin-igra/admin-igra.component';
import { IgracComponent } from './igrac/igrac.component';
import { SuperPojamComponent } from './super-pojam/super-pojam.component';
import { IgracRangComponent } from './igrac-rang/igrac-rang.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'supervizor', component: SupervizorComponent},
  {path: 'supergeo', component: SuperGeoComponent},
  {path: 'admin-igra', component: AdminIgraComponent},
  {path: 'igrac', component: IgracComponent},
  {path: 'superpojam', component: SuperPojamComponent},
  {path: 'igrac-rang', component: IgracRangComponent},
  {path: '', component: LoginComponent}
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
