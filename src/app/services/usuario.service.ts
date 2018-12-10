import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}auth/usuario`, data, httpOptions).pipe(
      catchError(this.handleError<any>('auth-usuario'))
    );
  }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}usuario`, httpOptions).pipe(
      catchError(this.handleError<any>('get-usuarios'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
