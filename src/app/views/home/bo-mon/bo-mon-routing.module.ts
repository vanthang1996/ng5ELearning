import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhSachBoMonComponent } from './danh-sach-bo-mon/danh-sach-bo-mon.component';


const routes: Routes = [
  {
    path: 'danh-sach-bo-mon',
    component: DanhSachBoMonComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoMonRoutingModule { }
