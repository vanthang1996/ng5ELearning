import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChuongMucRoutingModule } from './chuong-muc-routing.module';
import { XemDeCuongComponent } from './xem-de-cuong/xem-de-cuong.component';
import { MaterialModule } from '../../../material.module';


@NgModule({
  imports: [
    CommonModule,
    ChuongMucRoutingModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    XemDeCuongComponent
  ],
  providers: [],
})
export class ChuongMucModule { }
