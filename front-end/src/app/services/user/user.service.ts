import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDTO } from '../../DTOs/user.DTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async create(user: userDTO) {
    return this.http.post(`http://localhost:3000/users/create`, user);
  }
}
