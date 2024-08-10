import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CrewService } from '../services/crew.service';
import { Crew } from '../models/crew.model';
import { CrewAddDialogComponent } from '../crew-add-dialog/crew-add-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { CrewEditDialogComponent } from '../crew-edit-dialog/crew-edit-dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { CertificateDialogComponent } from '../edit-certificate-popup/edit-certificate-popup.component';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list-component.component.html',
  styleUrls: ['./crew-list-component.component.css'],
})
export class CrewListComponent implements OnInit, AfterViewInit {
  crewList: Crew[] = [];
  lang: string = '';
  languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
  ];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'discount',
    'totalIncome',
    'actions',
  ];
  dataSource = new MatTableDataSource<Crew>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private crewService: CrewService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router
  ) {}

  applyDiscount(index: number): void {
    const crew = this.dataSource.data[index];
    const discount = crew.discount || 0;
    crew.totalIncome =
      crew.dailyRate * crew.daysOnBoard -
      (crew.dailyRate * crew.daysOnBoard * discount) / 100;
    this.dataSource.data = [...this.dataSource.data];
  }

  ngOnInit() {
    this.lang =
      typeof window !== 'undefined'
        ? localStorage.getItem('lang') || 'en'
        : 'en';
    this.translate.use(this.lang);
    this.loadCrewData();
  }

  get totalIncomeSumUSD(): number {
    return this.crewList
      .filter((crew) => crew.currency === 'USD')
      .reduce((sum, crew) => sum + crew.totalIncome, 0);
  }

  get totalIncomeSumEUR(): number {
    return this.crewList
      .filter((crew) => crew.currency === 'EUR')
      .reduce((sum, crew) => sum + crew.totalIncome, 0);
  }

  ngAfterViewInit() {
    // Ensure paginator and sort are set after view is initialized
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ChangeLang(event: MatSelectChange) {
    if (typeof window !== 'undefined') {
      const selectedLanguage = event.value;
      localStorage.setItem('lang', selectedLanguage);
      this.translate.use(selectedLanguage);
    }
  }

  loadCrewData() {
    // Get the crew data from the service
    const crewData = this.crewService.getCrewList();
    this.dataSource.data = crewData;

    // Ensure paginator and sort are set after data is loaded
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.crewList = this.crewService.getCrewList();
  }

  deleteCrew(id: number): void {
    console.log('Deleting crew with id:', id); // Debug: Hangi id siliniyor
    this.crewService.deleteCrew(id);
    this.loadCrewData(); // Refresh data
    console.log('Crew deleted with id:', id); // Debug: Silme sonrası id
  }

  openAddCrewDialog(): void {
    const dialogRef = this.dialog.open(CrewAddDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.crewService.addCrew(result);
        this.loadCrewData(); // Refresh data
      }
    });
  }

  openEditCrewDialog(crew: Crew, index: number): void {
    const dialogRef = this.dialog.open(CrewEditDialogComponent, {
      width: '400px',
      data: crew,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.crewService.updateCrew(index, result);
        this.loadCrewData(); // Refresh data
      }
    });
  }

  openCertificateDialog(certificates: string[]): void {
    this.dialog.open(CertificateDialogComponent, {
      data: { certificates },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
