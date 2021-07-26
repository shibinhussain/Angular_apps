import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from './search-item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {
  apiRoot: String = 'https://itunes.apple.com/search';
  obj: object[];
  constructor(private http: HttpClient) {}

  search(term: string): Observable<SearchItem[]> {
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=10`;
    return this.http.get<any>(apiURL).pipe(
      map((res) => {
        return res.results.map((item) => {
          console.log(item);
          return new SearchItem(
            item.trackName,
            item.artistName,
            item.trackViewUrl,
            item.artworkUrl30,
            item.artistId
          );
        });
      })
    );
  }
}
