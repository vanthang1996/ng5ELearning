import { Subject } from 'rxjs/Subject';
import { NotifyMessageService } from './../../../_services/notify-message.service';
import { Component, OnInit } from '@angular/core';
import { SpringSocketService } from '../../../_services/spring-socket.service';

@Component({
  selector: 'app-notify-message',
  templateUrl: 'notify-message.component.html'
})

export class NotifyMessageComponent implements OnInit {
  showNotify = true;
  listNotify: any;
  numberOfNotifyMessage = 0;
  //
  numberOfRecord: number;
  numberOfPage: number;
  current_page = 1;
  collectionPageShow;
  limit = 3;

  constructor(private notifyMessageService: NotifyMessageService,
    private springSocketService: SpringSocketService) {
    this.springSocketService.getAllMessenger().subscribe((res: any) => {
      this.loadNumberNotify();
    });

  }
  loadNumberNotify() {
    this.notifyMessageService.numberNotify().subscribe((data: any) => {
      console.log(data);
      this.numberOfNotifyMessage = data;
    });
  }
  ngOnInit() {
    this.loadNumberNotify();
    this.loadData();
  }

  public showMore() {
    this.limit += 3;
    this.loadData();
    this.showNotify = true;
  }
  loadData() {
    this.notifyMessageService.getNotify(this.current_page, this.limit).subscribe((data: any) => {
      this.listNotify = data.listOfResult;
      console.log(data);
    });
    this.showNotify = !this.showNotify;
  }
  reload() {
    this.notifyMessageService.resetNumberNotify().subscribe(data => console.log(data));
    this.limit = 3;
    this.numberOfNotifyMessage = 0;
    this.loadData();
  }
}
