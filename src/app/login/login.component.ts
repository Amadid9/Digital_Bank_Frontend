import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string = '';

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });



  handleLogin() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        const roles = this.authService.getRoles();

        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigateByUrl('/admin/clients'); // updated
        } else if (roles.includes('ROLE_EMPLOYEE')) {
          this.router.navigateByUrl('/employee/clients'); // updated
        } else {
          this.errorMessage = 'Rôle inconnu';
        }
      },
      error: () => {
        this.errorMessage = 'Login ou mot de passe incorrect';
      }
    ,})}}






