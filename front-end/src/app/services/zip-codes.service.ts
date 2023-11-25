import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZipCodesService {
  constructor(private http: HttpClient) {}

  async getSearchNearby(data: { zip: string; radius: number }) {
    let key =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibWFyaWEiLCJpYXQiOjE3MDA4NzMyODAsImV4cCI6MTcwMDk1OTY4MH0.-pIoX2Qrjl5kKCWNrSXRHZgYreQIcNW3iiRgxv3jn5w';
    return this.http.get(
      `http://localhost:3000/maps/searchNearby?zip=${data.zip}&radius=${
        data.radius * 1000
      }`,
      { headers: { Authorization: `Bearer ${key}` } }
      // }`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }
}
