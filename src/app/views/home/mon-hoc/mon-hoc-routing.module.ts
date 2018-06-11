import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachMonHocComponent } from './danh-sach-mon-hoc/danh-sach-mon-hoc.component';


const routes: Routes = [
  {
    path: '',
    component: DanhSachMonHocComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonHocRoutingModule { }
