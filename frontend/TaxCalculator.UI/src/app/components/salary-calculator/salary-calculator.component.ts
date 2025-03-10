import { Component } from '@angular/core';
import { SalaryService } from '../../services/salary.service';
import { SalaryEntryComponent } from '../salary-entry/salary-entry.component';
import { SalaryResultComponent } from '../salary-result/salary-result.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-salary-calculator',
  standalone: true,
  imports: [CommonModule, MatCardModule, SalaryEntryComponent, SalaryResultComponent],
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css']
})
export class SalaryCalculatorComponent {
  result: any = null;
  isCalculating: boolean = false;

  constructor(private salaryService: SalaryService) {}

  onSalarySubmit(grossSalary: number) {
    this.isCalculating = true;
    this.salaryService.calculateSalary(grossSalary).subscribe({
      next: (result) => {
        this.result = result;
        this.isCalculating = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.result = null;
        this.isCalculating = false;
      }
    });
  }

  formatNumber(value: number): string {
    const str = value.toString();
    const [integer, fraction = '00'] = str.split('.');
    return `<span class="integer">${integer}</span><span class="decimal">.</span><span class="fraction">${fraction.padEnd(2, ' ')}</span>`;
  }
}