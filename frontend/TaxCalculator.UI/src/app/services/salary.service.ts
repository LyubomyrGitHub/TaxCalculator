import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalaryService {
  private apiUrl = 'http://localhost:5000/api/salary/calculate';

  constructor(private http: HttpClient) {}

  calculateSalary(grossSalary: number): Observable<any> {
    const request = { grossSalary }; // Create TaxRequest object
    return this.http.post(this.apiUrl, request);
  }
}