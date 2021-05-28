import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Issue } from '@shared/interfaces/issue.interface';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, pluck, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private endpoint = `${environment.BASE_URL}/${environment.DEFAULT_USER_REPO}/${environment.ISSUES}`;

  private issuesBehaviorSub: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([])
  issues$ = this.issuesBehaviorSub.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.getIssues();
  }

  getIssues(): void {
    const params = new HttpParams()
      .set('per_page', 20);
    const headers = new HttpHeaders()
      .set('accept', 'application/vnd.github.v3+json')

    this.http.get<any>(this.endpoint, { params, headers })
      .pipe(
        take(1),
        tap((issues: Issue[]) => {
          this.issuesBehaviorSub.next(issues)
          // console.log(issues)
        }),
        catchError(error => {
          console.warn('GetIssues Error: ', error);
          return of([])
        })
      ).subscribe();
  }
}
