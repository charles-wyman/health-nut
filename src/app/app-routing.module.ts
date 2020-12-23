import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HomeComponent } from './views/home/home.component';



const homeRoute: Route = {
  path: 'home',
  component: HomeComponent
};

const defaultRoute: Route = {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
};

const routes: Routes = [homeRoute, defaultRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
