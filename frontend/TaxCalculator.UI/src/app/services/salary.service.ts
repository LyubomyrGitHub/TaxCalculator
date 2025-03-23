import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SalaryService {
  private apiUrl = `${environment.apiBaseUrl}/api/salary`;

  constructor(private http: HttpClient) {}

  calculateSalary(grossSalary: number): Observable<any> {
    const request = { grossSalary };
    return this.http.post(`${this.apiUrl}/calculate`, request);
  }
  
  getSalaryList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  getTaxBands(): Observable<TaxBandResult[]> { // New method
    return this.http.get<TaxBandResult[]>(`${this.apiUrl}/list`);
  }
}

// Interface for TaxBandResult
export interface TaxBandResult {
  lowerLimit: number;
  upperLimit: number | null;
  taxRate: number;
}