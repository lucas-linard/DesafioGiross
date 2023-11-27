import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // private apiService:
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {}

  loginFailed = false;
  submitOnProcess = false;
  payload = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  async authenticate() {
    interface LoginResponse {
      access_token: string;
    }

    this.submitOnProcess = true;

    let { email, password } = this.payload.value;
    if (!email || !password) {
      alert('Preencha todos os campos');
      return;
    }

    let api = await this.authService.login({ email, password });
    api
      .pipe(
        catchError((error) => {
          this.loginFailed = true;
          return throwError(error); // Reenviar o erro para que possa ser capturado por outro bloco catch se necessário
        })
      )
      .subscribe((data) => {
        const dataTyped = data as LoginResponse;
        localStorage.setItem('token', dataTyped.access_token);
        this.router.navigate(['/']);
      });
    this.submitOnProcess = false;
  }
}
