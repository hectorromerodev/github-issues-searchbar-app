import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '@service/data.service';
import { Subject } from 'rxjs';
import { tap, map, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-searchbar',
  template: `
    <section class="searchbar__container">
      <div class="searchbar__input">
        <label for="search">Search an issue by name...</label>
        <input [formControl]="search" type="text" role="searchbox" placeholder="Search an issue by name...">
        <button (click)="onClear()" class="button">X</button>
      </div>
    </section>
  `,
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnDestroy {
  search: FormControl = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(
    private dataServ: DataService
  ) {
    this.onSearch()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onSearch(): void {
    this.search.valueChanges
      .pipe(
        map(search => search?.toLowerCase().trim()),
        debounceTime(200),
        distinctUntilChanged(),
        filter(search => search !== '' && search?.length > 2),
        tap(search => this.dataServ.filterIssueByTitle(search)),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  onClear(): void {
    this.search.reset();
    this.dataServ.reset();
  }
}
