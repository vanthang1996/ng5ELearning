import { Injectable } from '@angular/core';

@Injectable()
export class ConfigValue {
  role_GV = 'ROLE_GV';
  token = 'token';
  host_name = 'localhost:80';
  url_port = `http://${this.host_name}/E_Learning`;
  auth_refresh = '/auth/refresh';
  auth_login = '/auth/login';
  remember = 'remember';
}
