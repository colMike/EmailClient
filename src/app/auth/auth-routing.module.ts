import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignOutComponent} from './sign-out/sign-out.component';


const routes: Routes = [
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'signout', component: SignOutComponent
  },
  {
    path: '', component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
