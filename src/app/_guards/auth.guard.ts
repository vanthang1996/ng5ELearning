import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ConfigValue } from '../_helpers/config-value';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private config: ConfigValue) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

/**
 * Dùng để ngăn user không được phép truy cập
 * Sử dụng trong app-routing.module để bảo vệ đường dẫn của trang chủ
 */
