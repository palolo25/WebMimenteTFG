import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { AccountComponent } from '../account/account.component';
import { SupabaseService } from '../../services/supabase.service';
import { PassrecoverymodalComponent } from "../passrecoverymodal/passrecoverymodal.component";
import { Modal } from 'bootstrap';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [RouterModule, FooterComponent, FormsModule, SignupComponent, AccountComponent, PassrecoverymodalComponent]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router){}

  async ngOnInit() {
    const { user } = await this.supabaseService.getUser();
    if (user) {
      this.router.navigate(['/account']);
    }
  }

  async signIn(){
    if(!this.email ||!this.password){
      window.alert('Introduce datos válidos');
    }else{
      try{
        const{data,error} = await this.supabaseService.signIn(this.email, this.password);
        if(error){
          throw error;
        }
        this.router.navigate(['/account']);
      } catch (error:any) {
        window.alert(`Error al iniciar sesión: ${error.message}`);
        this.email = '';
        this.password = '';
      }
    }

  }

  openRecoveryModal() {
    const modalElement = document.getElementById('passwordRecoveryModal') as HTMLElement;
    const modal = new Modal(modalElement, {
      keyboard: false
    });
    modal.show();
  }

}
