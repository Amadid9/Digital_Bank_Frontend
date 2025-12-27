import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Client {
  id?: number;
  nom: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private http = inject(HttpClient);


  private apiServerUrl = 'http://localhost:8085/api';

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}/clients`, client);
  }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/clients`);
  }

  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/clients/${clientId}`);
  }

  public searchClients(keyword: string): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.apiServerUrl}/clients/search?keyword=${keyword}`
    );
  }



  public getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.apiServerUrl}/clients/${id}`
    );
  }

  public updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(
      `${this.apiServerUrl}/clients/${id}`,
      client
    );
  }

}



