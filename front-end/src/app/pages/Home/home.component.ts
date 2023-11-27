import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { ZipCodesService } from '../../services/zipCodes/zip-codes.service';
import { NearBySearchDTO } from '../../DTOs/nearBySearch.DTO';

export interface HistoryTable {
  entry_zip_code: string;
  radius: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ],
  providers: [ZipCodesService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  token: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ZipCodesService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      //route to login
      this.router.navigate(['/login']);
    } else {
      try {
        let api = await this.apiService.getHistory(this.token);

        api.subscribe((data) => {
          //@ts-ignore
          this.tableDataSource = data.data as HistoryTable[];
        });
      } catch (error) {}
    }
  }

  users: any[] = [];
  searchResult: string = '';
  formValue: any;
  payload = this.formBuilder.group({
    zipCode: [''],
    radius: [0],
  });

  displayedColumns: string[] = ['entry_zip_code', 'radius'];
  tableDataSource = [] as HistoryTable[];

  async getInput() {
    let referenceData: NearBySearchDTO = {
      zip: this.payload.value.zipCode,
      radius: this.payload.value.radius,
      token: this.token,
    } as NearBySearchDTO;

    let api = await this.apiService.getSearchNearby(referenceData);

    api.subscribe((data) => {
      this.tableDataSource.push({
        //@ts-ignore
        entry_zip_code: this.payload.value.zipCode,
        //@ts-ignore
        radius: this.payload.value.radius,
      });
      let zipCodes = data as string[];
      this.searchResult = `resultado: \n\n${zipCodes.map(
        (zip) => `\n ${zip}`
      )}`;
    });
  }

  title = 'front-end';
}
