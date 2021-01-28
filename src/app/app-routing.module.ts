import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestSheetsComponent} from "./test-sheets/test-sheets.component";

const routes: Routes = [
  { path: '', component: TestSheetsComponent},
  { path: 'about', component: TestSheetsComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
