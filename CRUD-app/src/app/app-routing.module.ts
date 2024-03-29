import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudRoutingModule } from './crud/crud-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [CrudRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
