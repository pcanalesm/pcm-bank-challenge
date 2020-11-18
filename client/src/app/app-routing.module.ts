import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';


const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
