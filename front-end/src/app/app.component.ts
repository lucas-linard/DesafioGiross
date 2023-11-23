import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Form, FormBuilder, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ZipCodesService } from './services/zip-codes.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [ZipCodesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  users: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ZipCodesService
    ) {}

  async ngOnInit(): Promise<void> {
    
  }

  

  formValue : any;
  payload = this.formBuilder.group({
    zipCode: [''],
    radius: [''],
  })

  async getInput() {
    let apiUrl = 'http://localhost:3000/maps/geocode?zipCode='+ this.payload.value.zipCode;
    let api =  await this.apiService.getZipCodes(apiUrl);
  
    api.subscribe((data) => {
      this.users = data as any[];
      console.log(this.users);
    }
    );

    console.log(this.payload.value)
   }

  title = 'front-end';
}
