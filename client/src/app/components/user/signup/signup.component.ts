import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkPasswords, rutValidate } from 'src/app/services/validators/signup.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get f() { return this.signupForm.controls; }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      mail: [ null , [Validators.required, Validators.email]],
      password: [ null , [Validators.required]],
      password_confirm: [ null , [Validators.required]],
      firstname: [ null , [Validators.required]],
      lastname: [ null , [Validators.required]],
      dni: [ null , [Validators.required, rutValidate()]]
    });
  }

  cleanForm() {

  }

  validateDni() {
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }


}
