import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CompteService } from '../services/compte.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-compte-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compte-details.html',
  styleUrls: ['./compte-details.css']
})
export class CompteDetailsComponent implements OnInit {

  private refresh$ = new BehaviorSubject<void>(undefined);
  compte$!: Observable<any>;
  operations$!: Observable<any[]>;

  operationForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private compteService: CompteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.operationForm = this.fb.group({
      type: ['DEBIT', Validators.required],
      montant: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      destinationId: ['']
    });

    const compteId$ = this.route.paramMap.pipe(
      map(params => params.get('id')!)
    );


    this.compte$ = this.refresh$.pipe(
      switchMap(() =>
        compteId$.pipe(
          switchMap(id => this.compteService.getCompte(id))
        )
      )
    );


    this.operations$ = this.refresh$.pipe(
      switchMap(() =>
        compteId$.pipe(
          switchMap(id => this.compteService.getOperations(id))
        )
      )
    );
  }


  submitOperation(compteId: string) {
    const v = this.operationForm.value;
    let obs$;

    if (v.type === 'DEBIT') {
      obs$ = this.compteService.debit(compteId, v.montant, v.description);
    }

    if (v.type === 'CREDIT') {
      obs$ = this.compteService.credit(compteId, v.montant, v.description);
    }

    if (v.type === 'VIREMENT') {
      obs$ = this.compteService.transfer(
        compteId,
        v.destinationId,
        v.montant,
        v.description
      );
    }

    if (!obs$) return;

    obs$.subscribe({
      next: () => {

        this.refresh$.next();


        this.operationForm.reset({
          type: 'DEBIT',
          montant: 0,
          description: '',
          destinationId: ''
        });
      }
    });
  }

}
