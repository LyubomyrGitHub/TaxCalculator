import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SalaryService } from './services/salary.service';
import { AppComponent } from './app.component';
import { SalaryCalculatorComponent } from './components/salary-calculator/salary-calculator.component';
import { SalaryEntryComponent } from './components/salary-entry/salary-entry.component';
import { SalaryResultComponent } from './components/salary-result/salary-result.component';

@NgModule({
  declarations: [], // No declarations since components are standalone
  imports: [
    NgIf,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppComponent,              // Standalone
    SalaryCalculatorComponent, // Standalone
    SalaryEntryComponent,      // Standalone
    SalaryResultComponent      // Standalone
  ],
  providers: [SalaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }