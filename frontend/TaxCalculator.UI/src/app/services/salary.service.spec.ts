import { TestBed } from '@angular/core/testing';
import { SalaryService } from './salary.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('SalaryService', () => {
  let service: SalaryService;
  let httpMock: HttpTestingController;

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

  it('should send a POST request to calculate salary and return the response', () => {
    const grossSalary = 50000;
    const mockResponse = {
      grossAnnualSalary: 50000,
      grossMonthlySalary: 4166.67,
      netAnnualSalary: 38000,
      netMonthlySalary: 3166.67,
      annualTaxPaid: 12000,
      monthlyTaxPaid: 1000
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
    const grossSalary = 50000;
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
    const grossSalary = 50000;
    const mockResponse = { grossAnnualSalary: 50000 };

    service.calculateSalary(grossSalary).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/salary/calculate`);
    expect(req.request.url).toBe(`${environment.apiBaseUrl}/api/salary/calculate`);
    req.flush(mockResponse);
  });
});