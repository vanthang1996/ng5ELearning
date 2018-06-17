import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.sass']
})

export class ChatComponent implements OnInit {

   showChatBox = false;

  constructor() { }

  ngOnInit() { }

  openChatBox(): void {
    this.showChatBox = !this.showChatBox;
  }

  closeChatBox(): void {
    this.showChatBox = false;
  }

}
