import { map, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ConfigValue } from '../../../_helpers/config-value';
import { Teacher } from '../../../_models';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.sass']
})

export class MainComponent implements OnInit {
  currentUser: any;
  public teacher: Teacher;
  name = '';
  weathers: any;
  today: Date = new Date();
  // directionDegree = {'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'};

  img_rain = 'https://lh3.google.com/u/0/d/1JrswEEKqsvxXAYZ5ipoBYXUZ908ywvHV=w1920-h974-iv1';
  img_cloud = 'https://lh3.google.com/u/0/d/1Ct898CvHYIy2weExXjpU6E1ekBT3gcEn=w1920-h974-iv1';

  constructor(
    private authentication: AuthenticationService,
    private http: HttpClient,
    private config: ConfigValue,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getName();
    this.getLocation();
    this.getTimeCurrent();
  }

  getName(): void {
    this.http.get(this.config.url_port + '/teacher/info').subscribe((teacher: any) => {
      this.teacher = teacher;
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      // console.log(navigator.geolocation.watchPosition);
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }
  }

  showPosition(position) {
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    // tslint:disable-next-line:max-line-length
    const link = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=8d71d589958b4ab13399b87530105ee6&units=metric&lang=vi`;
    // tslint:disable-next-line:max-line-length
    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=8d71d589958b4ab13399b87530105ee6&units=metric&lang=vi`);
    // tslint:disable-next-line:max-line-length
    this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude}&lon=${position.coords.longitude}&appid=8d71d589958b4ab13399b87530105ee6&units=metric&lang=vi`)
      .subscribe((data: any) => {
        // console.log(data);
        this.weathers = data;
      });
    const req = new HttpRequest('GET', link);
    return this.http.request(req).subscribe(data => data);
  }

  getTimeCurrent() {
    setInterval(() => {
      this.today = new Date();
    }, 1);
  }
}
