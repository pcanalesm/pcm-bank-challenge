import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from 'src/app/interfaces/alert';
import { AlertService } from 'src/app/services/shared/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      this.alerts = [];

      if (!alert) {
        return;
      }
      this.alerts.push(alert);

    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }

}
