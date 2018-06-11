import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XemDeCuongComponent } from './xem-de-cuong/xem-de-cuong.component';


const routes: Routes = [
  {
    path: 'xem-de-cuong/:subjectId',
    component: XemDeCuongComponent
  }, {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChuongMucRoutingModule { }
