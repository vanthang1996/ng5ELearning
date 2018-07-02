import { stat } from 'fs';
import { NotifyCenterService } from './../../../_services/notify-center.service';
import { NotifyCenter } from './../../../_models/notify-center';
import { Component, OnInit } from '@angular/core';
import { SpringSocketService } from '../../../_services/spring-socket.service';

@Component({
  selector: 'app-notify-center',
  templateUrl: './notify-center.component.html',
  styleUrls: ['./notify-center.component.css']
})
export class NotifyCenterComponent implements OnInit {
  isShowCenterMs = false;
  notifyCenter: NotifyCenter;
  constructor(private notifyCenterService: NotifyCenterService, private springSocketService: SpringSocketService) {
    this.notifyCenterService.getNotifyCenter().subscribe((res: NotifyCenter) => {
      this.isShowCenterMs = true;
      this.notifyCenter = res;
      // console.log('Notify: ', this.notifyCenter);
      setTimeout(() => { this.isShowCenterMs = false; }, 5000);
    });
    this.springSocketService.getAllMessenger().subscribe((res: any) => {
      this.isShowCenterMs = true;
      this.notifyCenter = { massage: res.body, status: null, details: null };
      // console.log('Notify: ', this.notifyCenter);
      setTimeout(() => { this.isShowCenterMs = false; }, 5000);
    });
  }

  ngOnInit() {
  }
}
