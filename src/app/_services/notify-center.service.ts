import { NotifyCenter } from './../_models/notify-center';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class NotifyCenterService {
    private subject = new Subject<NotifyCenter>();
    constructor() { }
    sendNotifyCenter(notifyCenter: NotifyCenter) {
        this.subject.next(notifyCenter);
    }
    clearNotifyCenter() {
        this.subject.next();
    }
    getNotifyCenter(): Observable<NotifyCenter> {
        return this.subject.asObservable();
    }
}
