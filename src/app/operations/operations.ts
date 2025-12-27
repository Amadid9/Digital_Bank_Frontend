import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompteService } from '../services/compte.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operations.html',
  styleUrls: ['./operations.css']
})
export class OperationsComponent implements OnInit {

  accountFormGroup!: FormGroup;
  operationFormGroup!: FormGroup;
  accountObservable!: any;
  operationType: string = 'DEBIT';
  errorMessage!: string;
  operations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private compteService: CompteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.accountFormGroup = this.fb.group({
      accountId: ['', Validators.required]
    });


    this.operationFormGroup = this.fb.group({
      operationType: ['DEBIT'],
      amount: [0, Validators.required],
      description: [''],
      accountDestination: ['']
    });
  }
  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;

    this.compteService.getCompte(accountId).subscribe({
      next: (data: any) => {
        this.accountObservable = data;
        this.errorMessage = "";
        this.loadOperations(accountId);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || "Compte introuvable !";
        this.accountObservable = null;
      }
    });
  }


  handleAccountOperation() {
    let accountId = this.accountFormGroup.value.accountId;
    let amount = this.operationFormGroup.value.amount;
    let description = this.operationFormGroup.value.description;
    let operationType = this.operationFormGroup.value.operationType;
    let destination = this.operationFormGroup.value.accountDestination;

    if (operationType == 'DEBIT') {
      this.compteService.debit(accountId, amount, description).subscribe({
        next: () => {
          alert("Débit effectué !");
          this.reloadAccountData();

        },
        error: (err) => console.log(err)
      });
    } else if (operationType == 'CREDIT') {
      this.compteService.credit(accountId, amount, description).subscribe({
        next: () => {
          alert("Crédit effectué !");
          this.reloadAccountData();

        },
        error: (err) => console.log(err)
      });
    }else if (operationType == 'TRANSFER') {
      this.compteService
        .transfer(accountId, destination, amount, description)
        .subscribe({
          next: () => {
            alert("Virement effectué !");
            this.reloadAccountData();

          },
          error: (err: any) => console.error("Erreur virement :", err)
        });
    }

  }



  loadOperations(accountId: string) {
    this.compteService.getOperations(accountId).subscribe({
      next: (data: any) => {
        this.operations = [...data];
        this.cdr.detectChanges();
      },
      error: (err: any) => console.log(err)
    });
  }

  reloadAccountData() {
    const accountId = this.accountFormGroup.value.accountId;

    this.compteService.getCompte(accountId).subscribe({
      next: (data) => {
        this.accountObservable = data;
        this.loadOperations(accountId);
      }
    });
  }

}
