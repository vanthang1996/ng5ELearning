import { NotifyMessageService } from './_services/notify-message.service';
import { JobService } from './_services/job.service';
import { NotifyCenter } from './_models/notify-center';
import { NotifyCenterService } from './_services/notify-center.service';
import { HomeComponent } from './views/home/home.component';
import { QuestionService } from './_services/questionService.service';
import { SubjectService } from './_services/subjectService.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HeaderComponent,
  SlidebarComponent,
  HomeLayoutComponent,
  ChatComponent,
  NotifyCenterComponent,
  NotifyMessageComponent
} from './shared';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AuthGuard } from './_guards';
import { MockBackend } from '@angular/http/testing';
import { AuthenticationService } from './_services/authentication.service';
import { ConfigValue } from './_helpers/config-value';
import { JwtInterceptor } from './_helpers/JwtInterceptor';
import { TeacherService } from './_services/teacherService.service';
import { StructureTestDetailService } from './_services/structureTestDetailService.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpErrorFilter } from './_helpers/HttpErrorInterceptor';
import { ExamTestService } from './_services/examtest.service';
import { ExamTestDetailService } from './_services/examTestDetail.service';
import { DepartmentService } from './_services/department.service';
import { FacultyService } from './_services/faculty.service';
import { UploadAvatarComponent } from './views/home/them-giang-vien/upload.component';
import { UploadFileService } from './_services/upload.service';
import { CreateQuestion } from './_models/createQuestion';
import { CreateQuestionService } from './_services/createQuestion.service';
import { ChapterService } from './_services/chapter.service';
import { SpringSocketService } from './_services/spring-socket.service';

const APP_COMPONENTS = [
  HeaderComponent,
  NotifyMessageComponent,
  SlidebarComponent,
  ChatComponent
];

const APP_CONTAINERS = [
  HomeLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_COMPONENTS,
    ...APP_CONTAINERS,
    StartComponent,
    LoginComponent,
    HomeComponent,
    NotifyCenterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    ConfigValue,
    AuthenticationService,
    TeacherService,
    QuestionService,
    SubjectService,
    ExamTestService,
    ExamTestDetailService,
    CreateQuestionService,
    DepartmentService,
    FacultyService,
    ChapterService,
    UploadFileService,
    NotifyCenterService,
    StructureTestDetailService,
    BaseRequestOptions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    HttpErrorFilter,
    JobService,
    SpringSocketService,
    NotifyMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
