import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ZipCodesService {
  constructor(private http: HttpClient) {}

  async getSearchNearby(data: { zip: string; radius: number, token: string }) {
    return this.http.get(
      `http://localhost:3000/maps/searchNearby?zip=${data.zip}&radius=${
        data.radius * 1000
      }`,
      { headers: { Authorization: `Bearer ${data.token}` } }
      // }`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  async getHistory(token: string) {
    return this.http.get(`http://localhost:3000/near-by-searches`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  }
}
