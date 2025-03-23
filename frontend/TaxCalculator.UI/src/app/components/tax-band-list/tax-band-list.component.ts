import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SalaryService, TaxBandResult } from '../../services/salary.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

interface FilterNode {
  name: string;
  children?: FilterNode[];
  value?: number | null;
}

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
    MatCheckboxModule,
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
  private allTaxBands: TaxBandResult[] = []; // Store original data

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterData: FilterNode[] = [];
  selectedFilters: Set<string> = new Set();

  constructor(private salaryService: SalaryService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadTaxBands();
  }

  loadTaxBands() {
    this.salaryService.getTaxBands().subscribe({
      next: (taxBands) => {
        this.allTaxBands = taxBands; // Store original data
        this.dataSource.data = taxBands; // Set initial data
        this.updateFilterData(taxBands);
      },
      error: (err) => console.error('Error fetching tax bands:', err)
    });
  }

  applyFilter() {
    let filteredData = [...this.allTaxBands]; // Start with full dataset

    // Apply search filter
    if (this.searchText.trim()) { // Only filter if search text is non-empty
      const filterValue = this.searchText.toLowerCase().trim();
      filteredData = filteredData.filter(band =>
        band.lowerLimit.toString().includes(filterValue) ||
        (band.upperLimit?.toString() ?? '').includes(filterValue) ||
        band.taxRate.toString().includes(filterValue)
      );
    }

    this.dataSource.data = filteredData; // Update table data
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

  updateFilterData(taxBands: TaxBandResult[]) {
    const lowerLimits = [...new Set(taxBands.map(b => b.lowerLimit))];
    const upperLimits = [...new Set(taxBands.map(b => b.upperLimit).filter(v => v !== null))];
    const taxRates = [...new Set(taxBands.map(b => b.taxRate))];

    this.filterData = [
      { name: 'LowerLimit', children: lowerLimits.map(value => ({ name: value.toString(), value })) },
      { name: 'UpperLimit', children: [{ name: 'null', value: null }].concat(upperLimits.map(value => ({ name: value!.toString(), value }))) },
      { name: 'TaxRate', children: taxRates.map(value => ({ name: value.toString(), value })) }
    ];
  }

  toggleFilter(node: FilterNode) {
    const key = `${node.name.toLowerCase()}:${node.value ?? 'null'}`;
    if (this.selectedFilters.has(key)) {
      this.selectedFilters.delete(key);
    } else {
      this.selectedFilters.add(key);
    }
    this.applyFilter();
  }

  private compare(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}