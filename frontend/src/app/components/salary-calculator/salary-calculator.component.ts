import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalaryService } from '../../services/salary.service';
import { finalize } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-salary-calculator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css']
})
export class SalaryCalculatorComponent {
  salaryForm = new FormGroup({
    grossSalary: new FormControl('', [Validators.required, Validators.min(0)])
  });
  isCalculating = false;
  result: any = null;

  constructor(private salaryService: SalaryService) {}

  calculate() {
    if (this.salaryForm.invalid) return;
    this.isCalculating = true;
    const grossSalary = this.salaryForm.value.grossSalary as string;
    this.salaryService.calculateSalary(Number(grossSalary))
      .pipe(finalize(() => this.isCalculating = false))
      .subscribe({
        next: (result) => this.result = result,
        error: (err) => console.error(err)
      });
  }
}