import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/account/transaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  depositForm: FormGroup;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private transactionService: TransactionService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.depositForm = this.fb.group({
        amount: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  get f() { return this.depositForm.controls; }

  onSubmit() {
    if (this.depositForm.invalid) {
      return;
    }

    this.transactionService.depositAmount(this.depositForm, this.formDirective);
  }

}
