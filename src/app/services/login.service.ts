import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string
  constructor(private httpClient: HttpClient) { }

  getToken(): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    //const url = '${environment.tokenapi}';
    const url = 'https://stgdash.xpresso.ai/api/auth';
    return this.httpClient
      .post(
        url,
        { uid: "ASahu2", pwd: "Abzooba@123" },
        {
          headers: headers,
          observe: 'body',
          responseType: 'json'
        }
      )
      .pipe(
        //tap(data => console.log("Data: " + JSON.stringify(data))),
        tap(data => console.log("Data: " + data || {})),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error
        }`;
    }
    console.error(err);
    return throwError('some message');

  }


  /* 
    login(user) {
      user = { email: 'abc@example.com', password: 'Test@123' };
      //data = { email: 'admin@example.com', password: 'Test@123' };
      //return this.httpClient.post('http://localhost:3070/api/login', data);
  
      const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
      const headers = {headers:reqHeader};
      return this.httpClient
        .post('http://localhost:55009/api/login', user, headers)
        .map((data: any) => {
          this.token = data;
          localStorage.setItem('userToken', this.token.token);
          this.errorMessage = data.token.error;
          console.log('token ===> ' + data.token.token);
          console.log('isTokenValid ===> ' + this.isTokenValid());
  
          console.log('errorMessage ===> ' + this.errorMessage);
  
  
          return this.isTokenValid();
        })
        //  .map((response:any) => response.json())
        .catch(this.handleError);
    }
  
    getCustomerDetails() {
      return this.httpClient.get('http://localhost:3070/api/details');
    } */
}
