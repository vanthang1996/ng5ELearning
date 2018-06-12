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
    path: 'bo-mon/:departmentId',
    component: MonHocComponent
  }, {
    path: 'mon-hoc/:subjectId',
    component: DanhSachDeThiComponent
  }, {
    path: 'tao-de-thi/:structureTestId',
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
