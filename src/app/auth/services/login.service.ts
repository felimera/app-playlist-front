import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Token } from '../interfaces/toker.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private baseUrl = environments.baseUrl;

  constructor(private http: HttpClient) { }

  postLogin(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/login`, user);
  }
}
