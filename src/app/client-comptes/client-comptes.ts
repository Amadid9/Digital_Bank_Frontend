import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompteService } from '../services/compte.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-client-comptes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-comptes.html',
  styleUrls: ['./client-comptes.css']

})
export class ClientComptesComponent {

  comptes$!: Observable<any[]>;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.comptes$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(clientId =>
        this.compteService.getComptesByClient(clientId)
      )
    );
  }
}
