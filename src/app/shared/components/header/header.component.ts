import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'com-header',
  moduleId: module.id,
  templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
 constructor(private router: Router)  {

 }
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']) ;
    }
   }
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']) ;
  }
}
