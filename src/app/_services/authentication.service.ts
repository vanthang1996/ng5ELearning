import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigValue } from '../_helpers/config-value';
import { Teacher } from '../_models';

@Injectable()
export class AuthenticationService {

  public token: string;

  constructor(private http: HttpClient, private config: ConfigValue) {
    // kiểm tra có lưu trong local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<any> {
    // return this.http.post<any>(this.config.auth_login, { email: email, password: password }) ;
    return this.http.post<any>(this.config.url_port + this.config.auth_login, {
      email: email,
      pwd: password
    }).pipe(map(teacher => {
      //  console.log(teacher);
      if (teacher && teacher.token) {
        localStorage.setItem(
          this.config.token,
          JSON.stringify(teacher.token)
        );
      }
      return teacher;
    }));
  }

  // public createUser(username: string, password: string): Observable<any> {
  //   return this.http.post<any>('/api/users', { email: username, password: password });
  // }

  refreshToken(): any {
    return this.http.get(this.config.url_port + this.config.auth_refresh)
      .pipe(
        map(data => {
          let teacher: any = {};
          teacher = data;
          if (teacher && teacher.access_token) {
            localStorage.setItem(
              this.config.token,
              JSON.stringify(teacher.access_token)
            );
          }
          return teacher;
        },
          (err: HttpErrorResponse) => {
            if (err.status === 403) {
              console.log('Chưa đăng nhập!');
            }
          }
        )
      );
  }

  getInformation(): any {
    return this.http.get(this.config.url_port + '/teacher/info')
      .pipe(map((teacher: Teacher) => {
        return teacher;
      }
      ));
  }

  logout(): void {
    // xóa khỏi local storage
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}

/**
 *  Thông tin người dùng đăng nhập được lưu vào bộ nhớ cục bộ nên người dùng sẽ vẫn đăng nhập khi refesh lại trang
 */
