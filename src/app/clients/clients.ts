import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClientService, Client } from '../services/client.service';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';



import { Subject, BehaviorSubject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clients.html',
  styleUrls: ['./clients.css']
})
export class ClientsComponent implements OnInit {
  private refresh$ = new Subject<void>();
  clients$!: Observable<Client[]>;
  keyword: string = '';
  errorMessage: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.clients$ = this.refresh$.pipe(
      startWith({}),
      switchMap(() => {
        if (this.keyword.trim() === '') {
          return this.clientService.getClients();
        }
        return this.clientService.searchClients(this.keyword);
      })
    );


    this.refreshClients();
  }

  refreshClients() {
    this.refresh$.next();
  }

  loadClients() {
    this.refreshClients();
  }

  handleNewClient() {
    this.router.navigateByUrl('/admin/nouveau-client');
  }

  handleDeleteClient(c: Client) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${c.nom} ?`)) return;
    if (!c.id) return;

    this.clientService.deleteClient(c.id).subscribe({
      next: () => this.refreshClients(),
      error: () => alert('Erreur lors de la suppression')
    });
  }

  handleSearchClients() {
    this.refreshClients();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
