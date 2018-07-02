import { SpringSocketService } from './../../_services/spring-socket.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { HttpErrorResponse, HttpClient, HttpRequest } from '@angular/common/http';
import { ConfigValue } from '../../_helpers/config-value';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  // model: any = {};
  loading = false;
  error = '';
  private returnUrl: string;
  private userRemember: any = {};
  loginFormGroup: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private config: ConfigValue,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private springSocketService: SpringSocketService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.getLocation();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem(this.config.remember)) {
      this.userRemember = JSON.parse(atob(localStorage.getItem(this.config.remember)));
    }

    if (!this.config.remember) {
      this.userRemember = {};
      this.userRemember.email = '';
      this.userRemember.password = '';
    }

    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl(this.userRemember.email, [
        Validators.required,
        // tslint:disable-next-line:max-line-length
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl(this.userRemember.password, [
        Validators.minLength(8),
        Validators.required,
      ]),
      rememberMe: new FormControl(this.userRemember.rememberMe)
    });
    // this.authenticationService.logout();
  }

  login() {
    if (!this.loading) {
      this.loading = true;
      this.authenticationService.login(this.loginFormGroup.value.email, this.loginFormGroup.value.password)
        .subscribe(data => {
          this.loading = false;
          if (this.loginFormGroup.value.rememberMe) {
            localStorage.setItem(this.config.remember, btoa(JSON.stringify(this.loginFormGroup.value)));
          } else {
            localStorage.removeItem(this.config.remember);
          }
          console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        }, (err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.error = 'Tài khoản hoặc mật khẩu không đúng!';
            this.loading = false;
          }
        });
    }
  }

  // getLocation() {
  //   if (navigator.geolocation) {
  //     console.log(navigator.geolocation.watchPosition);
  //     navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
  //   }
  // }

  // showPosition(position) {
  //   console.log(position.coords.latitude);
  //   console.log(position.coords.longitude);
    // tslint:disable-next-line:max-line-length
  //   const link = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=8d71d589958b4ab13399b87530105ee6`;
    // tslint:disable-next-line:max-line-length
  //   console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=8d71d589958b4ab13399b87530105ee6`);
  //   // tslint:disable-next-line:max-line-length
  //   this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${
  //     position.coords.latitude}&lon=${position.coords.longitude}&appid=8d71d589958b4ab13399b87530105ee6`)
  //     .subscribe((data: any) => {
  //       console.log(data);
  //     });
  //   const req = new HttpRequest('GET', link);
  //   return this.http.request(req).subscribe(data => console.log(data));
  // }
}
