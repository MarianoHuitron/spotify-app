import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITokenResponse } from '../types/token';

const url = 'https://accounts.spotify.com/api/token';
const client_id = environment.client_id;
const client_secret = environment.client_secret;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _token: ITokenResponse;

  constructor(
    private _http: HttpClient
  ) { 
    this._token = JSON.parse(localStorage.getItem('auth_token')) as ITokenResponse;
  }

  set token(token: ITokenResponse) {
    localStorage.setItem('auth_token', JSON.stringify(token));
  }

  get token(): ITokenResponse {
    return this._token;
  }

  generate() {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', client_id);
    body.set('client_secret', client_secret);

    return this._http.post<ITokenResponse>(`${url}`, body.toString() , {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })});
  }


}
