import { map, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(
    private authentication: AuthenticationService,
    private http: HttpClient,
    private config: ConfigValue,
    private router: Router
  ) { }

  ngOnInit() {
    this.getName();
  }

  getName(): void {
    this.http.get(this.config.url_port + '/teacher/info').subscribe((teacher: any) => {
      this.teacher = teacher;
    });
  }

}
