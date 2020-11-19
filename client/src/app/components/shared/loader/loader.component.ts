import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  isLoad : Subject<Boolean>;

  constructor(private loadService: LoaderService) {
    this.isLoad = this.loadService.isLoading;
   }

  ngOnInit(): void {
  }

}
