import { Subject } from 'rxjs/Subject';
import { NotifyMessageService } from './../../../_services/notify-message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify-message',
  templateUrl: 'notify-message.component.html',
  styleUrls: ['notify-message.component.sass']
})

export class NotifyMessageComponent implements OnInit {

  listNotify: any;
  //
  numberOfRecord: number;
  numberOfPage: number;
  current_page = 1;
  collectionPageShow;
  limit = 3;

  constructor(private notifyMessageService: NotifyMessageService) { }
  ngOnInit() { }
  showMore() {
    this.limit += 3;
    this.loadData();
  }
  loadData() {
    this.listNotify = this.notifyMessageService.getNotify(this.current_page, this.limit);
  }
}
