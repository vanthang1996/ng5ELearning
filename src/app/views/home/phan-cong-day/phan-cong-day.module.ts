import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhanCongDayRoutingModule } from './phan-cong-day-routing.module';
import { MonHocPhanCongComponent } from './mon-hoc-phan-cong/mon-hoc-phan-cong.component';
import { ChiTietMonHocComponent } from './chi-tiet-mon-hoc/chi-tiet-mon-hoc.component';
import { BoMonPhanCongComponent } from './bo-mon-phan-cong/bo-mon-phan-cong.component';
import { MaterialModule } from '../../../material.module';


@NgModule({
  imports: [
    CommonModule,
    PhanCongDayRoutingModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    MonHocPhanCongComponent,
    BoMonPhanCongComponent,
    ChiTietMonHocComponent
  ],
  providers: [],
})
export class PhanCongDayModule { }
