import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeThiRoutingModule } from './de-thi-routing.module';
import { DanhSachDeThiComponent } from './danh-sach-de-thi/danh-sach-de-thi.component';
import { TaoDeThiComponent } from './tao-de-thi/tao-de-thi.component';
import { InDeThiComponent } from './in-de-thi/in-de-thi.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoMonComponent } from './bo-mon/bo-mon.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';


@NgModule({
  imports: [
    CommonModule,
    DeThiRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    DanhSachDeThiComponent,
    TaoDeThiComponent,
    InDeThiComponent,
    BoMonComponent,
    MonHocComponent
  ],
  providers: [],
})
export class DeThiModule { }
