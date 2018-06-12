import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './home-main/main.component';
import { CauTrucComponent } from './cau-truc/cau-truc.component';
import { ThemGiangVienComponent } from './them-giang-vien/them-giang-vien.component';
import { ThemBoMonComponent } from './them-bo-mon/them-bo-mon.component';
import { ThemMonHocComponent } from './them-mon-hoc/them-mon-hoc.component';
import { DuyetCongViecComponent } from './duyet-cong-viec/duyet-cong-viec.component';
import { ChiTietCongViecComponent } from './chi-tiet-cong-viec/chi-tiet-cong-viec.component';
import { SoanCauHoiComponent } from './soan-cau-hoi/soan-cau-hoi.component';
import { DuyetCauHoiComponent } from './duyet-cau-hoi/duyet-cau-hoi.component';
import { CapNhatThongTinComponent } from './cap-nhat-thong-tin/cap-nhat-thong-tin.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }, {
    path: 'bo-mon',
    loadChildren: './bo-mon/bo-mon.module#BoMonModule'
  }, {
    path: 'mon-hoc',
    loadChildren: './mon-hoc/mon-hoc.module#MonHocModule'
  }, {
    path: 'chuong-muc',
    loadChildren: './chuong-muc/chuong-muc.module#ChuongMucModule'
  }, {
    path: 'cau-truc/:subjectId',
    component: CauTrucComponent
  }, {
    path: 'cau-hoi',
    loadChildren: './cau-hoi/cau-hoi.module#CauHoiModule'
  }, {
    path: 'chi-tiet-cong-viec',
    component: ChiTietCongViecComponent
  }, {
    path: 'phan-cong-day',
    loadChildren: './phan-cong-day/phan-cong-day.module#PhanCongDayModule'
  }, {
    path: 'them-giang-vien',
    component: ThemGiangVienComponent
  }, {
    path: 'them-bo-mon',
    component: ThemBoMonComponent
  }, {
    path: 'them-mon-hoc',
    component: ThemMonHocComponent
  }, {
    path: 'phan-cong',
    loadChildren: './phan-cong/phan-cong.module#PhanCongModule'
  }, {
    path: 'duyet-cong-viec',
    component: DuyetCongViecComponent
  }, {
    path: 'de-thi',
    loadChildren: './de-thi/de-thi.module#DeThiModule'
  }, {
    path: 'cong-viec',
    loadChildren: './cong-viec/cong-viec.module#CongViecModule'
  }, {
    path: 'soan-cau-hoi',
    component: SoanCauHoiComponent
  }, {
    path: 'duyet-cau-hoi/:teacherId',
    component: DuyetCauHoiComponent
  }, {
    path: 'cap-nhat-thong-tin',
    component: CapNhatThongTinComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
