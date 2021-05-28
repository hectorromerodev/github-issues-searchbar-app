import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, pluck, take, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Issue } from '@shared/interfaces/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private endpoint = `${environment.BASE_URL}/${environment.SEARCH}/${environment.ISSUES}`;
  private readonly HEADERS = new HttpHeaders().set('accept', 'application/vnd.github.v3+json')

  private issuesBehaviorSub: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([])
  issues$ = this.issuesBehaviorSub.asObservable();

  constructor(private http: HttpClient) { }

  filterIssueByTitle(title: string | number): void {
    const params = new HttpParams()
      .set('per_page', 30)
      .set('q', title);
    this.http.get<any>(this.endpoint, { params, headers: this.HEADERS })
      .pipe(
        take(1),
        pluck('items'),
        tap((issue: Issue[]) => this.issuesBehaviorSub.next(issue)),
        catchError(error => {
          console.warn('GetIssuesByTitle Error: ', error);
          return of([]);
        })
      ).subscribe();
  }
  reset(): void {
    this.issuesBehaviorSub.next([]);
  }
}
