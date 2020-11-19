import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AccountComponent } from './components/user/account/account.component';
import { DepositComponent } from './components/user/deposit/deposit.component';
import { OrderComponent } from './components/user/order/order.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { TransactionComponent } from './components/user/transaction/transaction.component';


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
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
