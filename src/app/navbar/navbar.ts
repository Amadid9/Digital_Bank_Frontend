import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  getUserInitial(): string {
    const username = this.authService.getUsername();
    return username ? username.charAt(0).toUpperCase() : '?';
  }

  authService = inject(AuthService);

  isAdmin() {
    return this.authService.isAdmin();
  }

  isEmployee() {
    return this.authService.isEmployee();
  }

  logout() {
    this.authService.logout();
  }
  getDashboardLink() {
    const roles = this.authService.getRoles();

    if (roles.includes('ROLE_ADMIN')) {
      return ['/admin/dashboard'];
    }

    if (roles.includes('ROLE_EMPLOYEE')) {
      return ['/employee/dashboard'];
    }

    return ['/login'];
  }
}













