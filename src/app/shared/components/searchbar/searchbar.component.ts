import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '@service/data.service';
import { Subject } from 'rxjs';
import { tap, map, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
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
        debounceTime(400),
        distinctUntilChanged(),
        filter(search => search !== '' && search?.length > 2),
        tap(search => console.log(search)),//this.dataServ.filterCharacters(search)),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  onClear(): void {
    this.search.reset();
  }
}
