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

  list(page: number, query: string, favorite: boolean): Observable<Thought[]> {
    const itemsPerPage = 6;
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', itemsPerPage);

    if (query) params = params.set('q', query);
    if (favorite) params = params.set('favorite', true);

    return this.http.get<Thought[]>(this.API, { params });
  }

  searchByID(id: number): Observable<Thought> {
    return this.http.get<Thought>(this.API + `/${id}`);
  }

  allItems(query: string, favorite: boolean): Observable<Thought[]> {
    let params = new HttpParams();
    if (favorite) params = params.set('favorite', true);
    if (query) params = params.set('q', query);

    return this.http.get<Thought[]>(this.API, { params });
  }

  create(thought: Thought): Observable<Thought> {
    return this.http.post<Thought>(this.API, thought);
  }

  delete(id: number) {
    return this.http.delete(this.API + `/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  edit(thought: Thought): Observable<Thought> {
    return this.http.put<Thought>(this.API + `/${thought.id}`, thought);
  }

  changeFavorite(thought: Thought): Observable<Thought> {
    thought.favorite = !thought.favorite;

    return this.edit(thought);
  }
}
