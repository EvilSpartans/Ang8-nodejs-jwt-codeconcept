import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth';
  TOKEN_NAME = 'jbb-token';
  decodedToken = null;

  constructor(private http: HttpClient) { }

login(credentials: any) {
  return this.http.post(`${this.BASE_URL}/login`, credentials);
}

userIsLoggedIn() {
  return !!localStorage.getItem('jbb-data');
}

logOut() {
  localStorage.removeItem('jbb-data');
}

register(credentials: any) {
  return this.http.post(`${this.BASE_URL}/register`, credentials);
}

addAuthorizationHeader(token: `String`) {
  return new HttpHeaders({Authorization: ['Bearer ' + token]});
}

decodeToken(token: any) {
  return jwtDecode(token);
}

}
