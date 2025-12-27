import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {Client, ClientService} from '../services/client.service';
import { CompteService } from '../services/compte.service';

@Component({
  selector: 'app-nouveau-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nouveau-compte.html',
  styleUrls: ['./nouveau-compte.css']
})
export class NouveauCompteComponent implements OnInit {

  accountFormGroup!: FormGroup;

  clients: Client[] = [];

  constructor(private fb: FormBuilder,
              private clientService: ClientService,
              private compteService: CompteService,
              private router: Router) { }

  ngOnInit(): void {

    this.accountFormGroup = this.fb.group({
      clientId: [null, Validators.required],
      balance: [0, [Validators.required, Validators.min(100)]],
      type: ['Courant', Validators.required],
      overDraft: [0],
      interestRate: [0]

    });
    this.clientService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;

         if (data.length > 0) {
          this.accountFormGroup.patchValue({
            clientId: data[0].id
          });
        }
      }
    });


    this.clientService.getClients().subscribe({
      next: (data: any) => {
        this.clients = data;
        console.log("Clients chargés :", data);
      },
      error: (err: any) => {
        console.log("Erreur chargement clients :", err);
      }
    });
  }
  handleSaveAccount() {
    const formValue = this.accountFormGroup.value;

    if (formValue.type === 'Courant') {


      const data = {
        clientId: formValue.clientId,
        soldeInitial: formValue.balance,
        decouvert: formValue.overDraft,
        devise: 'MAD'
      };

      this.compteService.createCompteCourant(data).subscribe({
        next: () => {
          alert("Compte courant créé avec succès");
          this.router.navigateByUrl("/admin/comptes");
        },
        error: err => {
          console.error(err);
          alert("Erreur création compte courant");
        }
      });

    } else {


      const data = {
        clientId: formValue.clientId,
        soldeInitial: formValue.balance,
        tauxInteret: formValue.interestRate,
        devise: 'MAD'
      };

      this.compteService.createCompteEpargne(data).subscribe({
        next: () => {
          alert("Compte épargne créé avec succès");
          this.router.navigateByUrl("/admin/comptes");
        },
        error: err => {
          console.error(err);
          alert("Erreur création compte épargne");
        }
      });
    }
  }


}
