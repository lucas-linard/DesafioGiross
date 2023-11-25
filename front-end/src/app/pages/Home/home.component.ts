import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { ZipCodesService } from '../../services/zip-codes.service';
import { NearBySearchDTO } from '../../DTOs/nearBySearch.DTO';

export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen' },
  { name: 'Helium' },
  { name: 'Lithium' },
  { name: 'Beryllium' },
  { name: 'Boron' },
  { name: 'Carbon' },
  { name: 'Nitrogen' },
  { name: 'Oxygen' },
  { name: 'Fluorine' },
  { name: 'Neon' },
];

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
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ZipCodesService
  ) {}

  async ngOnInit(): Promise<void> {}

  users: any[] = [];
  searchResult: string = '';
  formValue: any;
  payload = this.formBuilder.group({
    zipCode: [''],
    radius: [0],
  });

  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  async getInput() {
    let referenceData: NearBySearchDTO = {
      zip: this.payload.value.zipCode,
      radius: this.payload.value.radius,
    } as NearBySearchDTO;

    let api = await this.apiService.getSearchNearby(referenceData);

    api.subscribe((data) => {
      let zipCodes = data as string[];
      this.searchResult = `resultado: \n\n${zipCodes.map((zip) => `\n ${zip}`)}`;
    });

    console.log(this.payload.value);
  }

  title = 'front-end';
}
