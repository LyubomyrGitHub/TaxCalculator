import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryCalculatorComponent } from './components/salary-calculator/salary-calculator.component';

const routes: Routes = [
  { path: '', component: SalaryCalculatorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }