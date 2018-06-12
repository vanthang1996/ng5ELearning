import { Observable } from 'rxjs/observable';
import { ConfigValue } from './../_helpers/config-value';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NotifyMessageService {
    constructor(private http: HttpClient, private config: ConfigValue) { }
    getNotify(page: number, size: number): Observable<any> {
        return this.http.get(this.config.url_port + `/notify?page=${page}&size=${size}`);
    }
}
