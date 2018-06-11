import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'cap-nhat-thong-tin.component.html'
})

export class CapNhatThongTinComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  onSubmit(f: NgForm) {
    console.log(f.value);
  }
}
