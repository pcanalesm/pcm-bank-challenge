import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccountUser } from 'src/app/interfaces/account';
import { Transaction } from 'src/app/interfaces/transaction';
import { StatusService } from 'src/app/services/account/status.service';
import RutValidator from 'w2-rut-validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {

  trxDataSource: MatTableDataSource<Transaction>;
  account: AccountUser;
  displayedColumns: string[] = [ 'type', 'date', 'amount', 'remaining_amount'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private accountService: StatusService) { }


  ngAfterViewInit(): void {
    if (this.trxDataSource) {
      this.trxDataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.accountService.getAccountData().subscribe(acc => {
      this.trxDataSource = new MatTableDataSource(acc.transactions);
      this.account = acc;
      this.trxDataSource.paginator = this.paginator;
    });
  }

 formatDni(dni: string) {
   return RutValidator.format(dni);
 }
}
