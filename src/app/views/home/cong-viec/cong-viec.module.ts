import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongViecRoutingModule } from './cong-viec-routing.module';
import { ChiTietComponent } from './chi-tiet/chi-tiet.component';
import { TaoCauHoiComponent } from './tao-cau-hoi/tao-cau-hoi.component';
import { TaoDeCuongComponent, DialogComponent } from './tao-de-cuong/tao-de-cuong.component';
import { TaoCauTrucComponent } from './tao-cau-truc/tao-cau-truc.component';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    CongViecRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    ChiTietComponent,
    TaoCauHoiComponent,
    TaoDeCuongComponent,
    TaoCauTrucComponent,
    DialogComponent
  ],
  providers: [],
  bootstrap: [DialogComponent]
})
export class CongViecModule { }
