import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SalaryService {
  private apiUrl = `${environment.apiBaseUrl}/api/salary/calculate`;

  constructor(private http: HttpClient) {}

  calculateSalary(grossSalary: number): Observable<any> {
    const request = { grossSalary };
    return this.http.post(this.apiUrl, request);
  }
}