import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';
import { UserValidator } from 'src/app/services/validators/user.validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private signinValidator: UserValidator) {

                this.authService.chekLogin();

               }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      dni: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }, {
        validators: [this.signinValidator.rutValidate('dni')]
    });
  }

  get f() { return this.signinForm.controls; }

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }

    this.authService.login(this.signinForm);
  }

}
