import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SalaryService } from './salary.service';
import { TaxBandResult } from '../models/tax-band-result.model';
import { environment } from '../../environments/environment';

describe('SalaryService', () => {
  let service: SalaryService;
  let httpMock: HttpTestingController;

  const mockTaxBands: TaxBandResult[] = [
    { lowerLimit: 0, upperLimit: 5000, taxRate: 20 },
    { lowerLimit: 5000, upperLimit: 20000, taxRate: 40 },
    { lowerLimit: 20000, upperLimit: null, taxRate: 40 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SalaryService]
    });

    service = TestBed.inject(SalaryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // calculateSalary tests

  it('should send a POST request to calculate salary and return the response', () => {
    const grossSalary = 40000;
    const mockResponse = {
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67,
      annualTaxPaid: 11000,
      monthlyTaxPaid: 916.67
    };

    service.calculateSalary(grossSalary).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/calculate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ grossSalary });

    req.flush(mockResponse); // Simulate successful response
  });

  it('should handle HTTP errors gracefully', () => {
    const grossSalary = 40000;
    const errorMessage = 'Server error';

    service.calculateSalary(grossSalary).subscribe({
      next: () => fail('Expected an error, not a success'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/calculate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ grossSalary });

    req.flush(null, { status: 500, statusText: errorMessage }); // Simulate error response
  });

  it('should use the correct API URL from environment', () => {
    const grossSalary = 40000;
    const mockResponse = { grossAnnualSalary: 40000 };

    service.calculateSalary(grossSalary).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/calculate`);
    expect(req.request.url).toBe(`${environment.apiBaseUrl}/api/salary/calculate`);
    req.flush(mockResponse);
  });
  
  // getTaxBands tests
  
  it('should fetch tax bands from the correct API endpoint', fakeAsync(() => {
    service.getTaxBands().subscribe(taxBands => {
      expect(taxBands).toEqual(mockTaxBands);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/list`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTaxBands);

    tick();
  }));

  it('should return an Observable<TaxBandResult[]> on successful fetch', fakeAsync(() => {
    service.getTaxBands().subscribe(taxBands => {
      expect(taxBands.length).toBe(3);
      expect(taxBands).toEqual(mockTaxBands);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/list`);
    req.flush(mockTaxBands);

    tick();
  }));

  it('should handle HTTP error and emit error through Observable', fakeAsync(() => {
    service.getTaxBands().subscribe({
      next: () => fail('Expected error, got success'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/list`);
    req.flush('Server Error', { status: 500, statusText: 'Server Error' });

    tick();
  }));

  it('should use the correct API base URL from environment', fakeAsync(() => {
    service.getTaxBands().subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/list`);
    expect(req.request.url).toBe(`${environment.apiBaseUrl}/api/salary/list`);
    req.flush(mockTaxBands);

    tick();
  }));
});