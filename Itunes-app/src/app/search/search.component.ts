import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchItem } from '../search-item';
import { SearchService } from '../search.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public loading: boolean = false;
  public results: Observable<SearchItem[]>;
  public searchField: FormControl;

  constructor(private itunes: SearchService) {}
  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((_) => (this.loading = true)),
      switchMap((term) => this.itunes.search(term)),
      tap((_) => (this.loading = false))
    );
  }
  doSearch(term: string) {
    this.itunes.search(term);
  }
}
