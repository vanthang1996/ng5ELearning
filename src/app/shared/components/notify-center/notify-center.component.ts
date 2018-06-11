import { NotifyCenterService } from './../../../_services/notify-center.service';
import { NotifyCenter } from './../../../_models/notify-center';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify-center',
  templateUrl: './notify-center.component.html',
  styleUrls: ['./notify-center.component.css']
})
export class NotifyCenterComponent implements OnInit {
  isShowCenterMs = false;
  notifyCenter: NotifyCenter;
  constructor(private notifyCenterService: NotifyCenterService) {
    this.notifyCenterService.getNotifyCenter().subscribe((res: NotifyCenter) => {
      this.isShowCenterMs = true;
      this.notifyCenter = res;
      console.log('Notify: ', this.notifyCenter);
      setTimeout(() => { this.isShowCenterMs = false; }, 5000);
    });
  }

  ngOnInit() {
  }
}
