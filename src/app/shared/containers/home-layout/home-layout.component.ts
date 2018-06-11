import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: 'home-layout.component.html'
})

export class HomeLayoutComponent implements OnInit {
  showMenu = false;

  openSide() {
    this.showMenu = true;
  }
  constructor() {

  }

  ngOnInit() { }
}
