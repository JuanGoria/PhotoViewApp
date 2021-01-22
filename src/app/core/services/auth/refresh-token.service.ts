import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TOKEN_KEY, Auth } from '../../model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(private http: HttpClient) { }

  public refreshToken(): Observable<Auth> {
    return this.http.post<Auth>(`${environment.api.url}/auth`, { apiKey: environment.api.apiKey })
      .pipe(tap((response: any) => {
        this.setToken(response.token);
      }))
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }
}
