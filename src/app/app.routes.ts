import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients';
import { ComptesComponent } from './comptes/comptes';
import { NouveauCompteComponent } from './nouveau-compte/nouveau-compte';
import { OperationsComponent } from './operations/operations';
import { LoginComponent } from './login/login.component';
import { NouveauClientComponent } from './nouveau-client/nouveau-client';
import { EditClientComponent } from './edit-client/edit-client';
import { ClientComptesComponent } from './client-comptes/client-comptes';
import { AuthGuard } from './guards/auth-guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },

  {
    path: 'compte-details/:id',
    loadComponent: () =>
      import('./compte-details/compte-details')
        .then(m => m.CompteDetailsComponent),
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/edit/:id', component: EditClientComponent },
      { path: 'clients/:id/comptes', component: ClientComptesComponent },
      { path: 'comptes', component: ComptesComponent },
      { path: 'nouveau-compte', component: NouveauCompteComponent },
      { path: 'nouveau-client', component: NouveauClientComponent },
      { path: 'operations', component: OperationsComponent },

      {
        path: 'compte-details/:id',
        loadComponent: () =>
          import('./compte-details/compte-details')
            .then(m => m.CompteDetailsComponent)
      },

      { path: '', redirectTo: 'clients', pathMatch: 'full' } // page par défaut
    ]
  },

  {
    path: 'employee',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EMPLOYEE'] },
    children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/:id/comptes', component: ClientComptesComponent },
      { path: 'comptes', component: ComptesComponent },
      { path: 'operations', component: OperationsComponent },

      {
        path: 'compte-details/:id',
        loadComponent: () =>
          import('./compte-details/compte-details')
            .then(m => m.CompteDetailsComponent)
      },

      { path: '', redirectTo: 'clients', pathMatch: 'full' } // page par défaut
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
