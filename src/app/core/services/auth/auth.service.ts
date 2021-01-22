import { Injectable } from "@angular/core";
import { TOKEN_KEY } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  public getAuthToken(): string {
    return String(localStorage.getItem(TOKEN_KEY));
  }

  public clean(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
