import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageLayoutComponent} from './layout/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
