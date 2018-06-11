import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs/observable';
import { ConfigValue } from '../_helpers/config-value';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable()
export class SpringSocketService {
  constructor(private config: ConfigValue) {
    setTimeout(() => { this.connect(); }, 1000);
  }
  private userOnline = new Subject<any>();
  private messenger = new Subject<any>();
  private stompClient = null;
  socket = null;
  whoami = null;
  sendUserOnline(message: any) {
    this.userOnline.next(message);
  }
  clear() {
    this.userOnline.next();
  }
  getAllUser(): Observable<any> {
    return this.userOnline.asObservable();
  }

  sendMessenger(message: any) {
    this.messenger.next(message);
  }
  clearMessenger() {
    this.messenger.next();
  }
  getAllMessenger(): Observable<any> {
    return this.messenger.asObservable();
  }
  public connect() {
    this.socket = new SockJS(`${this.config.url_port}/chat`);
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.debug = null;
    const that = this;
    if (localStorage.getItem(this.config.token)) {
      const token = localStorage.getItem(this.config.token);
      this.stompClient.connect({ Authorization: `${token}` }, (frame) => {
        this.whoami = frame.headers['user-name'];
        if (this.socket.readyState === SockJS.OPEN) {
          that.stompClient.subscribe('/user/queue/messages', (message) => {
            this.sendMessenger(JSON.parse(message.body));
          });
        }
      }, (err) => {
        // setTimeout(() => {
        //   this.connect();
        // }, 5000);
        this.closeConnection();
        localStorage.clear();
        console.log(err);
      });
    }
  }
  public closeConnection() {
    this.socket.close();
  }
  public sendMessageTo(user: string, message: string) {
    if (!message.length) {
      return;
    } else
      if (localStorage.getItem(this.config.token)) {
        const token = localStorage.getItem(this.config.token);
        this.stompClient.send('/app/chat', { Authorization: `${token}` }, JSON.stringify({
          'user': user,
          'message': message
        }));
      }
  }
}
