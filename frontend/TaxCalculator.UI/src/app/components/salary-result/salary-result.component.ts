import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-salary-result',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './salary-result.component.html',
  styleUrls: ['./salary-result.component.css']
})
export class SalaryResultComponent {
  @Input() result: any;
  @Input() formatNumber!: (value: number) => string; // Add this as an Input
}