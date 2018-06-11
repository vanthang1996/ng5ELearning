import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhanCongRoutingModule } from './phan-cong-routing.module';
import { PhanCongCongViecComponent } from './phan-cong-cong-viec/phan-cong-cong-viec.component';
import { CauTrucComponent } from '../cau-truc/cau-truc.component';
import { PhanCongCauHoiComponent } from './phan-cong-cau-hoi/phan-cong-cau-hoi.component';
import { PhanCongDeCuongComponent } from './phan-cong-de-cuong/phan-cong-de-cuong.component';
import { PhanCongCauTrucComponent } from './phan-cong-cau-truc/phan-cong-cau-truc.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PhanCongRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    PhanCongCongViecComponent,
    PhanCongDeCuongComponent,
    PhanCongCauTrucComponent,
    PhanCongCauHoiComponent
  ],
  providers: [],
})
export class PhanCongModule { }
