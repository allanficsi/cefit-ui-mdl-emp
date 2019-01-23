import { HOST_CEFIT } from '../cefit.api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TokenService {

  constructor(private http: HttpClient) {}

  validateAuthenticationToken(login: string, token: string){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${HOST_CEFIT}/api/validate`, login, {headers});
  }

}
