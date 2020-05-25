import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentals {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SigninCredentals {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://api.angular-email.com';

  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {

    return this.http.post<UsernameAvailableResponse>(this.url + '/auth/username', {
      username
    });
  }

  signup(credentials: SignupCredentals) {
    return this.http.post<SignupResponse>(this.url + '/auth/signup', credentials
    ).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(this.url + '/auth/signedin')
      .pipe(
        tap(({authenticated}) => {
          this.signedin$.next(authenticated);
        })
      );
  }

  signOut() {
    return this.http.post<SignedInResponse>(this.url + '/auth/signout', {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }

  signIn(credentials: SigninCredentals) {

    return this.http.post(this.url + '/auth/signin', credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

}
