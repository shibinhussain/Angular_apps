import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'customers',
    loadChildren: () =>
      import('src/app/customers/customers.module').then(
        m => m.CustomersModule
      )
  },
];

@NgModule({
  imports: [CommonModule
    ,RouterModule.forRoot(routes)],
  exports: [RouterModule], 
})
export class AppRoutingModule {}
