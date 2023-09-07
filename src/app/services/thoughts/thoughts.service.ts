import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Thought } from 'src/app/interfaces/iThoughts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThoughtsService {
  private API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Thought[]> {
    return this.http.get<Thought[]>(this.API);
  }

  searchByID(id: number): Observable<Thought> {
    return this.http.get<Thought>(this.API + `/${id}`);
  }

  create(thought: Thought): Observable<Thought> {
    return this.http.post<Thought>(this.API, thought);
  }

  delete(id: number) {
    return this.http.delete(this.API + `/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
