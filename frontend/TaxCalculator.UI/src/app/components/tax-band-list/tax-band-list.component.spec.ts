import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaxBandListComponent } from './tax-band-list.component';
import { SalaryService, TaxBandResult } from '../../services/salary.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TaxBandListComponent', () => {
  let component: TaxBandListComponent;
  let fixture: ComponentFixture<TaxBandListComponent>;
  let salaryServiceMock: jasmine.SpyObj<SalaryService>;

  const mockTaxBands: TaxBandResult[] = [
    { lowerLimit: 0, upperLimit: 5000, taxRate: 20 },
    { lowerLimit: 5000, upperLimit: 20000, taxRate: 40 },
    { lowerLimit: 20000, upperLimit: null, taxRate: 40 }
  ];

  beforeEach(async () => {
    salaryServiceMock = jasmine.createSpyObj('SalaryService', ['getTaxBands']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        BrowserAnimationsModule,
        TaxBandListComponent
      ],
      providers: [
        { provide: SalaryService, useValue: salaryServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxBandListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    // Reset mock to default success case per test
    salaryServiceMock.getTaxBands.and.returnValue(of(mockTaxBands));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tax bands from service on initialization', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(salaryServiceMock.getTaxBands).toHaveBeenCalled();
    expect(component.allTaxBands).toEqual(mockTaxBands);
    expect(component.dataSource.data).toEqual(mockTaxBands);
  }));

  it('should render tax bands in the table', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(3); // Verify data before DOM check
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(3);

    const firstRowCells = rows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('0');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('5000');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('20');
  }));

  it('should filter tax bands based on search text', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    component.searchText = '5000';
    component.applyFilter();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(2); // Matches lowerLimit: 5000 and upperLimit: 5000
    const firstRowCells = rows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('0');
  }));

  it('should reset to all tax bands when search text is cleared', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    component.searchText = '5000';
    component.applyFilter();
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(2);

    component.searchText = '';
    component.applyFilter();
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(3);
  }));

  it('should sort tax bands by lowerLimit ascending', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    component.sortData({ active: 'lowerLimit', direction: 'asc' });
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    const firstRowCells = rows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('0');
  }));

  it('should update page size on pagination change', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const paginator = component.paginator;
    paginator.pageSize = 5;
    component.onPageChange({ pageIndex: 0, pageSize: 5, length: mockTaxBands.length } as PageEvent);
    fixture.detectChanges();

    expect(component.pageSize).toBe(5);
  }));

  it('should handle API error gracefully', fakeAsync(() => {
    salaryServiceMock.getTaxBands.and.returnValue(throwError(new Error('API error')));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.allTaxBands).toEqual([]);
    expect(component.dataSource.data).toEqual([]);
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(0);
  }));
});