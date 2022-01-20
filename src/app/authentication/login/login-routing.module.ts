import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, LoginTemplateComponent } from './components';

export const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginTemplateComponent,
    children: [{ path: '', component: LoginComponent }],
  },
];

@NgModule({ imports: [RouterModule.forChild(loginRoutes)], exports: [RouterModule] })
export class LoginRoutingModule {}
