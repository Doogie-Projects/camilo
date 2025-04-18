import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

interface UserData {
  date: string;
  time: string;
  email: string;
  location: string;
}

interface HistoryEntry {
  address: string;
  date_time: string;
  lat?: string;
  lon?: string;
}

interface CheckInData {
  email: string;
  history?: HistoryEntry[];
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'time', 'email', 'location'];
  dataSource1: MatTableDataSource<UserData>;
  dataSource2: MatTableDataSource<UserData>;
  dataSource11: any[] = [];

  filteredData: any[] = [];
  pageSize = 5;
  pageIndex = 0;

  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator11') paginator11!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataCheckIn: UserData[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    this.dataSource1 = new MatTableDataSource<UserData>(this.dataCheckIn);
    this.dataSource2 = new MatTableDataSource<UserData>(this.dataCheckIn);
    this.dataSource11 = this.dataCheckIn
    



    this.loadRecords1();
    this.loadRecords2();
  }

  ngOnInit(): void {
    this.updatePagination();
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort;
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource11 = this.dataSource11.filter(item =>
      item.email.toLowerCase().includes(filterValue) ||
      item.date.includes(filterValue)
    );
    this.pageIndex = 0; // Resetando a página após o filtro
    this.updatePagination();
  }

  loadRecords1() {
    this.apiService.getAllCheckOut().subscribe((checkInData: CheckInData[]) => {
      console.log(checkInData);
      this.dataCheckIn = checkInData.flatMap((item, index) =>
        (item.history || []).map((entry, historyIndex) => ({
          date: new Date(entry.date_time).toISOString().split('T')[0],
          time: new Date(entry.date_time).toISOString().split('T')[1].slice(0, 8),
          email: item.email,
          location: entry.address,
        }))
      );
      this.dataSource1.data = this.dataCheckIn;
      this.dataSource11 = this.dataCheckIn;
      console.log(this.dataCheckIn);
    });
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  loadRecords2() {
    this.apiService.getAllCheckIn().subscribe((checkInData: CheckInData[]) => {
      console.log(checkInData);
      this.dataCheckIn = checkInData.flatMap((item, index) =>
        (item.history || []).map((entry, historyIndex) => ({
          date: new Date(entry.date_time).toISOString().split('T')[0],
          time: new Date(entry.date_time).toISOString().split('T')[1].slice(0, 8),
          email: item.email,
          location: entry.address,
        }))
      );
      this.dataSource2.data = this.dataCheckIn;
      console.log(this.dataCheckIn);
    });
  }

  updatePagination(){
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageIndex;
    this.filteredData = this.dataSource11.slice(startIndex, endIndex)
  }
}