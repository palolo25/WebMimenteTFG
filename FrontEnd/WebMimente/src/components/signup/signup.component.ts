import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,FooterComponent,FormsModule,LoginComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  professional: boolean = false;

  constructor(private supabaseService: SupabaseService, private router: Router){}

  async signUp(){
    if(!this.name || !this.email) {
      window.alert('Completa los campos');
    } else {
      try{
        const data = await this.supabaseService.signUp(this.email, this.password, this.name, this.professional);
        window.alert('Registrado con éxito!, Ahora inicia sesión');
        this.router.navigate(['/login']);
      } catch (error:any){
        console.error('Error al Registrarse', error);
        window.alert(`Error al Registrarse: ${error.message}`);
        this.email = '';
        this.password = '';
      }
    }

  }

}
