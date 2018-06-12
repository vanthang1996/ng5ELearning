import { NotifyCenterService } from './../../../_services/notify-center.service';
import { Component, OnInit } from '@angular/core';
import { Teacher, Role } from '../../../_models';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigValue } from '../../../_helpers/config-value';
import { collectExternalReferences } from '@angular/compiler';
import { element } from 'protractor';
import { NotifyCenter } from '../../../_models/notify-center';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'com-slidebar',
  templateUrl: 'slidebar.component.html'
})

export class SlidebarComponent implements OnInit {
  url_avatar_default = 'https://drive.google.com/uc?id=1eYDVkxYb6PkrRaMiR-hATtFBhE7I3f5M';
  public teacher: Teacher;
  public role: Array<Role> = new Array();
  public isLogin = true;
  public mapMenuRole: Map<string, Array<string>> = new Map(); // key la url, value la ten menu

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private config: ConfigValue,
    private notifyCenterService: NotifyCenterService
  ) { }

  ngOnInit() {
    this.getName();
    this.getRole();
  }


  getName(): void {
    this.http.get(this.config.url_port + '/teacher/info').subscribe((teacher: any) => {
      this.teacher = teacher;
    });
  }

  addMenuForTk(): void {
    this.mapMenuRole.clear();
    this.mapMenuRole.set('/bo-mon/danh-sach-bo-mon', Array('fas fa-archive', 'Bộ môn'));
    this.mapMenuRole.set('/chi-tiet-cong-viec', Array('fas fa-briefcase', 'Công việc'));
    this.mapMenuRole.set('/phan-cong-day', Array('fab fa-leanpub', 'Phân công dạy'));
    this.mapMenuRole.set('/them-giang-vien', Array('fas fa-plus', 'Thêm giảng viên'));
    this.mapMenuRole.set('/them-bo-mon', Array('fas fa-plus', 'Thêm bộ môn'));
    this.mapMenuRole.set('/them-mon-hoc', Array('fas fa-plus', 'Thêm môn học'));
    this.mapMenuRole.set('/de-thi', Array('fas fa-edit', 'Tạo đề thi'));
  }

  addMenuForTbm(): void {
    this.mapMenuRole.clear();
    this.mapMenuRole.set('/bo-mon/danh-sach-bo-mon', Array('fas fa-archive', 'Bộ môn'));
    this.mapMenuRole.set('/phan-cong', Array('fab fa-forumbee', 'Phân công'));
    this.mapMenuRole.set('/duyet-cong-viec', Array('fas fa-check', 'Duyệt'));
  }

  addMenuForGv(): void {
    this.mapMenuRole.clear();
    this.mapMenuRole.set('/mon-hoc', Array('fas fa-folder', 'Môn học'));
    this.mapMenuRole.set('/cong-viec', Array('fas fa-briefcase', 'Công việc'));
    this.mapMenuRole.set('/soan-cau-hoi', Array('fas fa-edit', 'Soạn câu hỏi'));
  }

  getRole(): void {
    this.http.get(this.config.url_port + '/teacher/role').subscribe((role: any) => {
      role.forEach((e: string) => {
        this.role.push(new Role(e));
      });
    });
  }


  showMenuItemByRole(value): void {
    switch (value) {
      case 'GV': this.addMenuForGv(); break;
      case 'TBM': this.addMenuForTbm(); break;
      case 'TK': this.addMenuForTk(); break;
    }
  }
  getKeys(map) {
    return Array.from(map.keys());
  }


}
