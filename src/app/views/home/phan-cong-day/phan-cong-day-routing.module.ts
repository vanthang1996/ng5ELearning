import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonHocPhanCongComponent } from './mon-hoc-phan-cong/mon-hoc-phan-cong.component';
import { ChiTietMonHocComponent } from './chi-tiet-mon-hoc/chi-tiet-mon-hoc.component';
import { BoMonPhanCongComponent } from './bo-mon-phan-cong/bo-mon-phan-cong.component';

const routes: Routes = [
  {
    path: '',
    component: BoMonPhanCongComponent
  }, {
    path: 'bo-mon/:departmentId',
    component: MonHocPhanCongComponent
  }, {
    path: 'mon-hoc/:subjectId',
    component: ChiTietMonHocComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhanCongDayRoutingModule { }
