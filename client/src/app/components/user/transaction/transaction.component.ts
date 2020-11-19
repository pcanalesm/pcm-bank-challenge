import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StatusService } from 'src/app/services/account/status.service';
import { TransactionService } from 'src/app/services/account/transaction.service';
import { TransactionValidator } from 'src/app/services/validators/transaction.validator';
import { UserValidator } from 'src/app/services/validators/user.validator';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  trxForm: FormGroup;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private fb: FormBuilder,
              private transactionService: TransactionService,
              private userValidator: UserValidator,
              private accountService: StatusService,
              private transactionValidator: TransactionValidator) { }

  ngOnInit(): void {
    this.trxForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
              [this.transactionValidator.validateOrder.bind(this)]],
      destiny_dni : ['', [Validators.required],
                  [this.transactionValidator.validateDestiny.bind(this),
                  this.transactionValidator.validateSameAccount.bind(this)]]
    }, {
        validators: [ this.userValidator.rutValidate('destiny_dni')]
    });
  }

  get f() { return this.trxForm.controls; }

  onSubmit() {
    if (this.trxForm.invalid) {
      return;
    }

    this.transactionService.transferAccount(this.trxForm, this.formDirective);
  }
}
