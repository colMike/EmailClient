import {AsyncValidator, FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../auth.service';
import {of} from 'rxjs';


@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  validate = (control: FormControl) => {

    const {value} = control;


    return this.authService.usernameAvailable(value)
      .pipe(
        map((item) => {
          if (item.available) {
            return null;
          }
        }),
        catchError((err) => {
          // console.log(err);

          if (err.error.username) {
            return of({nonUniqueUsername: true});
          } else {
            return of({noInternetConnection: true});
          }

        })
      );
  }
}
