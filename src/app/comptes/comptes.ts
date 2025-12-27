import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompteService } from '../services/compte.service';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink,],
  templateUrl: './comptes.html',
  styleUrls: ['./comptes.css']
})
export class ComptesComponent implements OnInit {

  comptes: any;
  errorMessage!: string;



  constructor(
    private compteService: CompteService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.handleSearchComptes();
  }

  handleSearchComptes() {

    this.compteService.getComptes().subscribe({
      next: (data) => {
        this.comptes = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  handleStatusChange(compte: any) {
    if (compte.statut === 'SUSPENDED') {
      return;

    }

    if (!confirm('are you sure with your chois ')) return;

    this.compteService.suspendAccount(compte.id).subscribe({
      next: () => {
        compte.statut = 'SUSPENDED';
        this.cdr.detectChanges();
      },
      error: () => {
        alert('error !!') ;
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  handleDeleteCompte(compte: any) {
    if (!confirm(`Voulez-vous supprimer le compte ${compte.id} ?`)) return;

    this.compteService.deleteCompte(compte.id).subscribe({
      next: () => {
        this.comptes = this.comptes.filter((c: any) => c.id !== compte.id);
        this.cdr.detectChanges();
      },
      error: () => {
        alert("Suppression impossible");
      }
    });
  }


}
