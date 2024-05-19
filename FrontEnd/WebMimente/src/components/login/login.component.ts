import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FooterComponent,FormsModule,SignupComponent,AccountComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  login(){}
}
