import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CauHoiRoutingModule } from './cau-hoi-routing.module';
import { DanhSachCauHoiComponent } from './danh-sach-cau-hoi/danh-sach-cau-hoi.component';
import { MaterialModule } from '../../../material.module';


@NgModule({
  imports: [
    CommonModule,
    CauHoiRoutingModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    DanhSachCauHoiComponent
  ],
  providers: [],
})
export class CauHoiModule { }
