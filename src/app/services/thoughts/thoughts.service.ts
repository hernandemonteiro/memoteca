import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Thought } from 'src/app/interfaces/iThoughts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThoughtsService {
  private API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  list(page: number, query: string): Observable<Thought[]> {
    const itemsPerPage = 6;
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', itemsPerPage);

    if (query != '') {
      params = params.set('q', query);
    }

    return this.http.get<Thought[]>(this.API, { params });
  }

  searchByID(id: number): Observable<Thought> {
    return this.http.get<Thought>(this.API + `/${id}`);
  }

  allItems(query: string): Observable<Thought[]> {
    if (query) {
      const params = new HttpParams().set('q', query);
      return this.http.get<Thought[]>(this.API, { params });
    }
    return this.http.get<Thought[]>(this.API);
  }

  create(thought: Thought): Observable<Thought> {
    return this.http.post<Thought>(this.API, thought);
  }

  delete(id: number) {
    return this.http.delete(this.API + `/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  edit(thought: Thought) {
    return this.http.put(this.API + `/${thought.id}`, thought);
  }
}
