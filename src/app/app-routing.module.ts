import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { CandidatelistComponent } from './candidatelist/candidatelist.component';
import { AdminComponent } from './admin/admin.component'; 
import { AdminauthGuard } from './adminauth.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
const routes: Routes = [
  {path:"register", component:RegisterComponent},
  {path:"edit", component:EditComponent},
  {path:"list", canActivate:[AdminauthGuard], component:CandidatelistComponent},
  {path:"admin",component:AdminComponent},
  {path:"", component:LandingpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }