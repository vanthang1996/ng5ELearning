import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './shared';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: '',
    component: HomeLayoutComponent,
    loadChildren: 'app/views/home/home.module#HomeModule'
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
