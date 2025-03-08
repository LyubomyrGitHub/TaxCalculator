import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaryCalculatorComponent } from './salary-calculator.component';
import { SalaryService } from '../../services/salary.service';
import { of } from 'rxjs';

describe('SalaryCalculatorComponent', () => {
  let component: SalaryCalculatorComponent;
  let fixture: ComponentFixture<SalaryCalculatorComponent>;
  let mockSalaryService: any;

  beforeEach(async () => {
    mockSalaryService = jasmine.createSpyObj('SalaryService', ['calculateSalary']);
    mockSalaryService.calculateSalary.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [SalaryCalculatorComponent],
      providers: [{ provide: SalaryService, useValue: mockSalaryService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable calculate button when form is invalid', () => {
    component.salaryForm.controls['grossSalary'].setValue('');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should call calculateSalary with correct TaxRequest object', () => {
    component.salaryForm.controls['grossSalary'].setValue('40000');
    component.calculate();
    expect(mockSalaryService.calculateSalary).toHaveBeenCalledWith(40000);
  });
});