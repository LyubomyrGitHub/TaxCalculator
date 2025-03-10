import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SalaryCalculatorComponent } from './salary-calculator.component';
import { SalaryService } from '../../services/salary.service';
import { SalaryEntryComponent } from '../salary-entry/salary-entry.component';
import { SalaryResultComponent } from '../salary-result/salary-result.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SalaryCalculatorComponent', () => {
  let component: SalaryCalculatorComponent;
  let fixture: ComponentFixture<SalaryCalculatorComponent>;
  let mockSalaryService: jasmine.SpyObj<SalaryService>;

  beforeEach(async () => {
    mockSalaryService = jasmine.createSpyObj('SalaryService', ['calculateSalary']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        SalaryEntryComponent,
        SalaryResultComponent,
        SalaryCalculatorComponent
      ],
      providers: [
        { provide: SalaryService, useValue: mockSalaryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with result as null and isCalculating as false', () => {
    expect(component.result).toBeNull();
    expect(component.isCalculating).toBeFalse();
  });

  it('should not render SalaryResultComponent when result is null', () => {
    component.result = null;
    fixture.detectChanges();
    const resultComponent = fixture.debugElement.query(By.css('app-salary-result'));
    expect(resultComponent).toBeNull();
  });

  it('should pass isCalculating to SalaryEntryComponent', () => {
    component.isCalculating = true;
    fixture.detectChanges();
    const entryComponent = fixture.debugElement.query(By.directive(SalaryEntryComponent)).componentInstance;
    expect(entryComponent.isCalculating).toBeTrue();

    component.isCalculating = false;
    fixture.detectChanges();
    expect(entryComponent.isCalculating).toBeFalse();
  });

  it('should pass result and formatNumber to SalaryResultComponent when result is set', () => {
    const mockResult = {
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67,
      annualTaxPaid: 11000,
      monthlyTaxPaid: 916.67
    };
    component.result = mockResult;
    fixture.detectChanges();

    const resultComponent = fixture.debugElement.query(By.directive(SalaryResultComponent)).componentInstance;
    expect(resultComponent.result).toEqual(mockResult);
    expect(resultComponent.formatNumber(40000)).toBe(component.formatNumber(40000));
  });
});