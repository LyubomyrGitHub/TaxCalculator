import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SalaryService, TaxBandResult } from '../../services/salary.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tax-band-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './tax-band-list.component.html',
  styleUrls: ['./tax-band-list.component.css']
})
export class TaxBandListComponent implements AfterViewInit {
  displayedColumns: string[] = ['lowerLimit', 'upperLimit', 'taxRate'];
  dataSource = new MatTableDataSource<TaxBandResult>([]);
  searchText: string = '';
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageSize: number = 10;
  allTaxBands: TaxBandResult[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private salaryService: SalaryService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadTaxBands();
  }

  loadTaxBands() {
    this.salaryService.getTaxBands().subscribe({
      next: (taxBands) => {
        this.allTaxBands = taxBands || [];
        this.dataSource.data = this.allTaxBands;
      },
      error: (err) => {
        this.allTaxBands = [];
        this.dataSource.data = [];
      }
    });
  }

  applyFilter() {
    let filteredData = [...this.allTaxBands];
    if (this.searchText.trim()) {
      const filterValue = this.searchText.toLowerCase().trim();
      filteredData = filteredData.filter(band =>
        band.lowerLimit.toString().includes(filterValue) ||
        (band.upperLimit?.toString() ?? '').includes(filterValue) ||
        band.taxRate.toString().includes(filterValue)
      );
    }
    this.dataSource.data = filteredData;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'lowerLimit': return this.compare(a.lowerLimit, b.lowerLimit, isAsc);
        case 'upperLimit': return this.compare(a.upperLimit ?? Number.MAX_VALUE, b.upperLimit ?? Number.MAX_VALUE, isAsc);
        case 'taxRate': return this.compare(a.taxRate, b.taxRate, isAsc);
        default: return 0;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
  }

  private compare(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}