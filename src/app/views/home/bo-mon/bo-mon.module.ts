import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoMonRoutingModule } from './bo-mon-routing.module';
import { DanhSachBoMonComponent } from './danh-sach-bo-mon/danh-sach-bo-mon.component';
import { MaterialModule } from '../../../material.module';


@NgModule({
  imports: [
    CommonModule,
    BoMonRoutingModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    DanhSachBoMonComponent
  ],
  providers: [],
})
export class BoMonModule { }
