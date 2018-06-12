import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ConfigValue } from '../_helpers/config-value';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable()
export class SpringSocketService {
  constructor(private config: ConfigValue) {
    setTimeout(() => { this.connect(); }, 1000);
  }
  private notifySystem = new Subject<any>();
  private messenger = new Subject<any>();
  private stompClient = null;
  socket = null;
  whoami = null;
  sendNotifySystem(message: any) {
    this.notifySystem.next(message);
  }
  clear() {
    this.notifySystem.next();
  }
  getNotifySystem(): Observable<any> {
    return this.notifySystem.asObservable();
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
    this.socket = new SockJS(`${this.config.url_port}/notify`);
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.debug = null;
    const that = this;
    if (localStorage.getItem(this.config.token)) {
      const token = JSON.parse(localStorage.getItem(this.config.token));
      this.stompClient.connect({ Authorization: token }, (frame) => {
        this.whoami = frame.headers['user-name'];
        if (this.socket.readyState === SockJS.OPEN) {
          that.stompClient.subscribe('/user/person/message', (message: any) => {
            this.sendMessenger(message);
          });
          that.stompClient.subscribe('/system/message', (message: any) => {
            this.sendNotifySystem(message);
          });
        }
      }, (err) => {
        this.closeConnection();
        localStorage.clear();
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
        this.stompClient.send('/app/message-box-user', { Authorization: `${token}` }, JSON.stringify({
          'user': user,
          'message': message
        }));
      }
  }
}
