import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachCauHoiComponent } from './danh-sach-cau-hoi/danh-sach-cau-hoi.component';

const routes: Routes = [
  {
    path: 'danh-sach-cau-hoi/:chapterId',
    component: DanhSachCauHoiComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CauHoiRoutingModule { }
