import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


//

// npm Modules
//

//Componentes
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { AccountComponent } from './components/user/account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    AlertComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
