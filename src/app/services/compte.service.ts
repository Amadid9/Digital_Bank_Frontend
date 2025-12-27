import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private backendHost = "http://localhost:8085/api";

  constructor(private http: HttpClient) { }

  public getComptes(): Observable<any> {
    return this.http.get(this.backendHost + "/comptes");
  }

  debit(compteId: string, montant: number, description: string) {
    return this.http.post(
      this.backendHost + "/operations/debit",
      {
        compteId: compteId,
        montant: montant,
        description: description
      }
    );
  }

  credit(compteId: string, montant: number, description: string) {
    return this.http.post(
      this.backendHost + "/operations/credit",
      {
        compteId: compteId,
        montant: montant,
        description: description
      }
    );
  }

  transfer(
    sourceId: string,
    destinationId: string,
    montant: number,
    description: string
  ) {
    return this.http.post(
      this.backendHost + "/operations/virement",
      {
        sourceId: sourceId,
        destinationId: destinationId,
        montant: montant,
        description: description
      }
    );
  }

  public suspendAccount(accountId: string): Observable<any> {
    return this.http.put(
      this.backendHost + "/comptes/" + accountId + "/suspend",
      {}
    );
  }


  public getCompte(accountId: string): Observable<any> {
    return this.http.get(this.backendHost + `/comptes/${accountId}`);
  }

  public getOperations(accountId: string): Observable<any> {
    return this.http.get(this.backendHost + `/comptes/${accountId}/operations`);
  }

  public createCompteCourant(data: any): Observable<any> {
    return this.http.post(this.backendHost + "/comptes/courant", data);
  }

  public createCompteEpargne(data: any): Observable<any> {
    return this.http.post(this.backendHost + "/comptes/epargne", data);
  }

  public getComptesByClient(clientId: number) {
    return this.http.get<any[]>(
      this.backendHost + '/comptes/client/' + clientId
    );
  }
  public deleteCompte(accountId: string): Observable<void> {
    return this.http.delete<void>(
      this.backendHost + "/comptes/" + accountId
    );
  }
}
