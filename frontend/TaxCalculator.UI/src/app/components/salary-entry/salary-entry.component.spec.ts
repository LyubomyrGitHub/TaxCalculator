import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaryEntryComponent } from './salary-entry.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SalaryEntryComponent', () => {
  let component: SalaryEntryComponent;
  let fixture: ComponentFixture<SalaryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
        SalaryEntryComponent // Move to imports
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a form containing grossSalary', () => {
    expect(component.salaryForm).toBeDefined();
    expect(component.salaryForm.get('grossSalary')?.value).toBe(0);
    expect(component.salaryForm.get('grossSalary')?.hasValidator(Validators.required)).toBeTrue();

    // Test Validators.min(1) behavior instead of instance
    const control = component.salaryForm.get('grossSalary');
    control?.setValue(0); // Below min(1)
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['min']).toBeTruthy();
    control?.setValue(1); // Meets min(1)
    expect(control?.valid).toBeTrue();
  });

  it('should emit salarySubmitted when form is valid and submitted', () => {
    spyOn(component.salarySubmitted, 'emit');
    component.salaryForm.setValue({ grossSalary: 50000 });
    component.submitSalary();
    expect(component.salarySubmitted.emit).toHaveBeenCalledWith(50000);
  });

  it('should not emit salarySubmitted when form is invalid', () => {
    spyOn(component.salarySubmitted, 'emit');
    component.salaryForm.setValue({ grossSalary: -1 }); // Invalid due to min(1)
    component.submitSalary();
    expect(component.salarySubmitted.emit).not.toHaveBeenCalled();
  });

  it('should disable button when isCalculating is true', () => {
    component.isCalculating = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
    expect(button.textContent.trim()).toContain('Calculating...');
  });

  it('should enable button and show "Calculate" when isCalculating is false', () => {
    component.isCalculating = false;
    component.salaryForm.patchValue({ grossSalary: 50000 }); // Set valid value
    component.salaryForm.updateValueAndValidity(); // Force validation update
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeFalse(); // Should pass now
    expect(button.textContent.trim()).toContain('Calculate');
  });
});