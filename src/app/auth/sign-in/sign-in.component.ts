import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    }
  );

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onFormSubmit() {

    if (this.signupForm.invalid) {
      console.log('Iko Mashida Kibaoo sana');
      return;
    }
    this.authService.signIn(this.signupForm.value)
      .subscribe({
        next: () => {

        },
        error: ({error, status}) => {

          if (!status) {
            this.signupForm.setErrors({noConnection: true});
          }

          if (error.username || error.password) {
            this.signupForm.setErrors({credentials: true});
          }
        }
      });

  }
}
