import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { MainComponent } from './home-main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../_helpers/JwtInterceptor';
import { CauTrucComponent } from './cau-truc/cau-truc.component';
import { ChiTietCongViecComponent } from './chi-tiet-cong-viec/chi-tiet-cong-viec.component';
import { ThemGiangVienComponent } from './them-giang-vien/them-giang-vien.component';
import { ThemBoMonComponent } from './them-bo-mon/them-bo-mon.component';
import { ThemMonHocComponent } from './them-mon-hoc/them-mon-hoc.component';
import { DuyetCongViecComponent } from './duyet-cong-viec/duyet-cong-viec.component';
import { SoanCauHoiComponent } from './soan-cau-hoi/soan-cau-hoi.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DuyetCauHoiComponent } from './duyet-cau-hoi/duyet-cau-hoi.component';
import { UploadAvatarComponent } from './them-giang-vien/upload.component';
import { CapNhatThongTinComponent } from './cap-nhat-thong-tin/cap-nhat-thong-tin.component';
import { ChangeAvatarComponent } from './cap-nhat-thong-tin/change-avt.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    HomeRoutingModule,
    HttpClientModule
  ],
  exports: [],
  declarations: [
    MainComponent,
    CauTrucComponent,
    ChiTietCongViecComponent,
    ThemGiangVienComponent,
    ThemBoMonComponent,
    ThemMonHocComponent,
    DuyetCongViecComponent,
    DuyetCauHoiComponent,
    SoanCauHoiComponent,
    UploadAvatarComponent,
    CapNhatThongTinComponent,
    ChangeAvatarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
})
export class HomeModule { }
