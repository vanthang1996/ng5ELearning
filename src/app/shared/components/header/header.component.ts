import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpringSocketService } from '../../../_services/spring-socket.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'com-header',
  moduleId: module.id,
  templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
  constructor(private router: Router, private springSocketService: SpringSocketService) {

  }
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }
  public logout() {
    this.springSocketService.closeConnection();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
