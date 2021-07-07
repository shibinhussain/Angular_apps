import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  public apiRoot = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }), 
  };
  constructor(private http: HttpClient) {}

  create(product: any): Observable<Product> {
    return this.http
      .post<Product>(
        this.apiRoot + '/products/',
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler)); 
  }
  getById(id: number): Observable<Product> {
    return this.http
      .get<Product>(this.apiRoot + '/products/' + id)
      .pipe(catchError(this.errorHandler));
  }
  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiRoot + '/products/')
      .pipe(catchError(this.errorHandler));
  }
  update(id: number, product: any): Observable<Product> {
    return this.http
      .put<Product>(
        this.apiRoot + '/products/' + id,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  delete(id: number) {
    return this.http
      .delete<Product>(this.apiRoot + '/products/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: any) {
    let errorMesssage = '';
    if (error.error instanceof ErrorEvent) {
      errorMesssage = error.error.messsage;
    } else {
      errorMesssage = `Error Code : ${error.status}
      Message: ${error.message}`;
    }
    console.log(errorMesssage);
    return throwError(errorMesssage); 
  }
}
