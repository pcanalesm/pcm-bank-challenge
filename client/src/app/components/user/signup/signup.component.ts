import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/user/auth.service';
import { UserValidator } from 'src/app/services/validators/user.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private signUpValidator: UserValidator) {
  }

  get f() { return this.signupForm.controls; }

  ngOnInit(): void {


    this.signupForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dni: ['', [Validators.required], [this.signUpValidator.availableDni.bind(this)]]
    }, {
      validators: [this.signUpValidator.match('password', 'password_confirm'),
      this.signUpValidator.rutValidate('dni')]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signUp(this.signupForm, this.formDirective);

  }


}
