import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ZipCodesService {
  constructor(private http: HttpClient) {}

  async getZipCodes(url: string) {
    return this.http.get(`http://localhost:3000/${url}`);
  }
}
