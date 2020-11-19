import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StatusService } from 'src/app/services/account/status.service';
import { TransactionService } from 'src/app/services/account/transaction.service';
import { TransactionValidator } from 'src/app/services/validators/transaction.validator';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private transactionService: TransactionService,
              private fb: FormBuilder,
              private transactionValidator: TransactionValidator,
              private accountService: StatusService) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
                    [this.transactionValidator.validateOrder.bind(this)]]
    });
  }

  get f() { return this.orderForm.controls; }

  onSubmit() {
    if (this.orderForm.invalid) {
        return;
    }

    this.transactionService.orderAmount(this.orderForm, this.formDirective);
  }

}
