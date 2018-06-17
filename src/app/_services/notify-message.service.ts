import { Observable } from 'rxjs/observable';
import { ConfigValue } from './../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';

@Injectable()
export class NotifyMessageService {
    resetNumberNotify(): Observable<any> {
        return this.http.get(this.config.url_port + `/reset-notify`);
    }
    numberNotify(): Observable<any> {
        return this.http.get(this.config.url_port + `/number-notify`);
    }
    constructor(private http: HttpClient, private config: ConfigValue) { }
    getNotify(page: number, size: number): Observable<any> {
        return this.http.get(this.config.url_port + `/notify-list?page=${page}&size=${size}`);
    }
}
