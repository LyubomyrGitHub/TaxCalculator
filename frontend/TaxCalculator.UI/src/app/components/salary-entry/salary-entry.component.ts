import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Add this

@Component({
  selector: 'app-salary-entry',
  standalone: true,
  imports: [
    CommonModule,          // Added for *ngIf
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './salary-entry.component.html',
  styleUrls: ['./salary-entry.component.css']
})
export class SalaryEntryComponent {
  salaryForm: FormGroup;
  @Input() isCalculating: boolean = false;
  @Output() salarySubmitted = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {
    this.salaryForm = this.fb.group({
      grossSalary: [0, [Validators.required, Validators.min(1)]]
    });
  }

  submitSalary() {
    if (this.salaryForm.valid) {
      const grossSalary = this.salaryForm.get('grossSalary')?.value;
      this.salarySubmitted.emit(grossSalary);
    }
  }
}