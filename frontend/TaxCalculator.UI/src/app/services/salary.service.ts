import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TaxBandResult } from '../models/tax-band-result.model';

@Injectable({ providedIn: 'root' })
export class SalaryService {
  private apiUrl = `${environment.apiBaseUrl}/api/salary`;

  constructor(private http: HttpClient) {}

  calculateSalary(grossSalary: number): Observable<any> {
    const request = { grossSalary };
    return this.http.post(`${this.apiUrl}/calculate`, request);
  }

  getTaxBands(): Observable<TaxBandResult[]> {
    return this.http.get<TaxBandResult[]>(`${this.apiUrl}/list`);
  }
}