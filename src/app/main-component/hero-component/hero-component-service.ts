import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environments.prod';
export interface Quote {
  quote: string;
  author: string;
}
@Injectable({
  providedIn: 'root'
})
export class HeroComponentService {
private http = inject(HttpClient);
private apiUrl = 'https://api.api-ninjas.com/v1/quotes';
private apiKey = environment.apiNinjasKey;
private cachedQuotes: Quote[] = [];
private currentIndex = 0;


  getRandomQuote(): Observable<Quote[]> {
  
    if (this.cachedQuotes.length > 0) {
      const quote = this.getNextCachedQuote();
      return of([quote]);
    }

  
    return this.fetchQuotesFromAPI();
  }

  private fetchQuotesFromAPI(): Observable<Quote[]> {
    const headers = new HttpHeaders({ 'X-Api-Key': environment.apiNinjasKey });
    
    return this.http.get<Quote[]>(this.apiUrl, { headers }).pipe(
      tap(quotes => {
        
        this.cachedQuotes.push(...quotes);
      })
    );
  }

  private getNextCachedQuote(): Quote {
    if (this.currentIndex >= this.cachedQuotes.length) {
      this.currentIndex = 0;
    }
    return this.cachedQuotes[this.currentIndex++];
  }

  
  prefetchQuotes(count: number = 10): void {
    for (let i = 0; i < count; i++) {
      this.fetchQuotesFromAPI().subscribe();
    }
  }
}

