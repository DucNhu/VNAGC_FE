import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get(uri: string) {
    console.log(AppConfig.settings.WhiteServer + uri)
    return this.http.get<any>(AppConfig.settings.WhiteServer + uri).pipe(
      catchError(this.handleError),
      map(data => {
        if (data.code == "HWE999") {
          this.router.navigateByUrl('/error-page');
        }
        return data;
      })
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);

      if (error.status === 403 && error.error) {
        return throwError(`${error.error.code}: ${error.error.message}`);
      }
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
