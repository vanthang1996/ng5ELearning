import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachDeThiComponent } from './danh-sach-de-thi/danh-sach-de-thi.component';
import { TaoDeThiComponent } from './tao-de-thi/tao-de-thi.component';
import { InDeThiComponent } from './in-de-thi/in-de-thi.component';
import { BoMonComponent } from './bo-mon/bo-mon.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';


const routes: Routes = [
  {
    path: '',
    component: BoMonComponent
  }, {
    path: ':departmentId',
    component: MonHocComponent
  }, {
    path: 'danh-sach/:subjectId',
    component: DanhSachDeThiComponent
  }, {
    path: 'tao-de-thi',
    component: TaoDeThiComponent
  }, {
    path: 'in-de-thi/:examTestId',
    component: InDeThiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeThiRoutingModule { }
