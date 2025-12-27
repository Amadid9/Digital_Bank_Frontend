import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  templateUrl: './edit-client.html',
  styleUrls: ['./edit-client.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditClientComponent implements OnInit {

  clientForm!: FormGroup;
  clientId!: number;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));

    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.clientService.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.clientForm.patchValue(client);
      },
      error: () => {
        this.errorMessage = 'Client introuvable';
      }
    });
  }

  handleUpdateClient() {
    if (this.clientForm.invalid) return;

    this.clientService.updateClient(this.clientId, this.clientForm.value)
      .subscribe({
        next: () => {
          this.successMessage = 'Client modifié avec succès';
          setTimeout(() => {
            this.router.navigate(['/admin/clients']);
          }, 1000);
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la modification';
        }
      });
  }
}
