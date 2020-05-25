import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatchPassword} from '../validators/match-password';
import {UniqueUsername} from '../validators/unique-username';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  authForm = new FormGroup({
      username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/)
        ], [
          this.checkUniqueUName.validate
        ]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
    }, {validators: [this.matchPassword.validate]}
  );

  constructor(
    private matchPassword: MatchPassword,
    private checkUniqueUName: UniqueUsername,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value)
      .subscribe((response) => {
        console.log(response.username);
      });
  }
}
