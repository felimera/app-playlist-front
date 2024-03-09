import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private baseUrl = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  postLogin(user: User): Observable<Token> {
    return this.httpClient.post<Token>(`${this.baseUrl}/login`, user);
  }
}
