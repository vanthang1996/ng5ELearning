import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
          this.router.navigate([this.returnUrl]);
        }, (err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.error = 'Tài khoản hoặc mật khẩu không đúng!';
            this.loading = false;
          }
        });
    }
  }
}
