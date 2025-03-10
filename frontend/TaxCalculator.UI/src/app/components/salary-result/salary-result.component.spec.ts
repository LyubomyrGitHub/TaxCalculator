import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaryResultComponent } from './salary-result.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';

describe('SalaryResultComponent', () => {
  let component: SalaryResultComponent;
  let fixture: ComponentFixture<SalaryResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        SalaryResultComponent // Move to imports instead of declarations
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render result values with formatted HTML when result is provided', () => {
    const mockResult = {
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67,
      annualTaxPaid: 11000,
      monthlyTaxPaid: 916.67
    };
    component.result = mockResult;
    component.formatNumber = (value: number) => {
      const str = value.toString();
      const [integer, fraction = '00'] = str.split('.');
      return `<span class="integer">${integer}</span><span class="decimal">.</span><span class="fraction">${fraction.padEnd(2, ' ')}</span>`;
    };
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('.result-row'));
    expect(rows.length).toBe(6);

    const testCases = [
      { label: 'Gross Annual Salary:', integer: '40000', fraction: '00' },
      { label: 'Gross Monthly Salary:', integer: '3333', fraction: '33' },
      { label: 'Net Annual Salary:', integer: '29000', fraction: '00' },
      { label: 'Net Monthly Salary:', integer: '2416', fraction: '67' },
      { label: 'Annual Tax Paid:', integer: '11000', fraction: '00' },
      { label: 'Monthly Tax Paid:', integer: '916', fraction: '67' }
    ];

    testCases.forEach((test, index) => {
      const row = rows[index];
      expect(row.query(By.css('.label')).nativeElement.textContent).toBe(test.label);

      const numberElement = row.query(By.css('.number'));
      const integer = numberElement.query(By.css('.integer')).nativeElement.textContent;
      const decimal = numberElement.query(By.css('.decimal')).nativeElement.textContent;
      const fraction = numberElement.query(By.css('.fraction')).nativeElement.textContent.trim();

      expect(integer).toBe(test.integer);
      expect(decimal).toBe('.');
      expect(fraction).toBe(test.fraction);
    });
  });

  it('should use formatNumber function for formatting values', () => {
    const mockResult = { grossAnnualSalary: 40000 };
    const formatSpy = jasmine.createSpy('formatNumber').and.returnValue(
      '<span class="integer">40000</span><span class="decimal">.</span><span class="fraction">00</span>'
    );
    component.result = mockResult;
    component.formatNumber = formatSpy;
    fixture.detectChanges();

    const numberElement = fixture.debugElement.query(By.css('.number'));
    const integer = numberElement.query(By.css('.integer')).nativeElement.textContent;
    const decimal = numberElement.query(By.css('.decimal')).nativeElement.textContent;
    const fraction = numberElement.query(By.css('.fraction')).nativeElement.textContent;

    expect(formatSpy).toHaveBeenCalledWith(40000);
    expect(integer).toBe('40000');
    expect(decimal).toBe('.');
    expect(fraction).toBe('00');
  });
});