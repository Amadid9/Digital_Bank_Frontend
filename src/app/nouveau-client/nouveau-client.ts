import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Client, ClientService } from '../services/client.service';

@Component({
  selector: 'app-new-client',
  standalone: true,

  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nouveau-client.html',
  styleUrls: ['./nouveau-client.css']
})
export class NouveauClientComponent {

  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private router = inject(Router);

  errorMessage: string = '';


  clientForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]]
  });

  handleSaveClient() {
     if (this.clientForm.invalid) {
      this.errorMessage = "Veuillez remplir les champs obligatoires.";
      return;
    }

    const newClient: Client = this.clientForm.value;


    this.clientService.addClient(newClient).subscribe({
      next: (data) => {

        alert("Client ajouté avec succès !");
        this.router.navigateByUrl('/admin/clients');
      },
      error: (err) => {

        console.error(err);
        if (err.status === 403) {
          this.errorMessage = "Accès refusé (403). Vérifiez que CSRF est désactivé dans le Backend.";
        } else if (err.status === 401) {
          this.errorMessage = "Session expirée. Veuillez vous reconnecter.";
        } else {
          this.errorMessage = "Erreur technique. Le backend est-il lancé ?";
        }
      }
    });
  }
}
