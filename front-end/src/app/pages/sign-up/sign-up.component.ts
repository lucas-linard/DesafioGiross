import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { userDTO } from '../../DTOs/user.DTO';
import { UserService } from '../../services/user/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
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
  providers: [UserService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder // private apiService:
  ) {}

  async ngOnInit(): Promise<void> {}

  payload = this.formBuilder.group({
    email: [''],
    username: [''],
    password: [''],
    confirmPassword: [''],
  });

  submitOnProcess = false;
  submitMessage = '';

  verificarCamposPreenchidos(obj: Record<string, any>): boolean {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] === undefined || obj[key] === null || String(obj[key]).trim() === '') {
          return false; // Se qualquer campo estiver vazio, retorna falso
        }
      }
    }
    return true; // Se todos os campos estiverem preenchidos, retorna verdadeiro
  }

  async signUp() {
    this.submitOnProcess = true;
    if (
      this.verificarCamposPreenchidos(this.payload.value) &&
      this.payload.value.password === this.payload.value.confirmPassword
    ) {
      console.log('Criando conta...');
      try {
        let user = {
          email: this.payload.value.email,
          name: this.payload.value.username,
          password: this.payload.value.password,
        } as userDTO;

        let api = await this.userService.create(user);

        api.subscribe((data) => {
          console.log(data);
          //@ts-ignore
          if (data.msg == 'OK') {
            this.submitMessage = 'Conta criada com sucessso!';
          } else {
            //@ts-ignore
            this.submitMessage = 'Erro ao criar conta!\n' + data.msg + '\n';
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.submitOnProcess = false;
      }
    } else {
      this.submitMessage = 'Erro ao criar conta!\n';
      if (this.payload.value.password !== this.payload.value.confirmPassword) {
        this.submitMessage += 'As senhas não coincidem!\n';
      }
      if (!this.verificarCamposPreenchidos(this.payload.value)) {
        this.submitMessage += 'Preencha todos os campos!';
      }
      this.submitOnProcess = false;
    }
  }
}
