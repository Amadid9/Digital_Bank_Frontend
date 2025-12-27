import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5 text-center">
      <h1 class="text-danger">⛔ Accès refusé</h1>
      <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
    </div>
  `
})
export class NotAuthorizedComponent {}
