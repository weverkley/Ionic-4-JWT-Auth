import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NavController } from '@ionic/angular';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import * as jwt_decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private navCtl: NavController, private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getDecodedToken(): any {
    return this.getDecodedAccessToken(JSON.parse(localStorage.getItem('token')));
  }

  getEncodedToken(): any {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getEncodedToken() !== null;
  }

  login(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}usuario/autenticar`, data, httpOptions).pipe(
      catchError(this.handleError<any>('auth-usuario'))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.navCtl.navigateRoot('/signin');
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

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
