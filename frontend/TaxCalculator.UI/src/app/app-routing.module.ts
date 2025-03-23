import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryCalculatorComponent } from './components/salary-calculator/salary-calculator.component';
import { TaxBandListComponent } from './components/tax-band-list/tax-band-list.component';

const routes: Routes = [
  { path: '', component: SalaryCalculatorComponent },
  { path: 'taxlist', component: TaxBandListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }