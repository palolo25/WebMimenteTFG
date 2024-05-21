import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { SupabaseService } from '../../app/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [FooterComponent, CommonModule, FormsModule],
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})
export class NewpasswordComponent {

  email: string = '';
  password: string = '';
  alertsuccess: string = '';
  alerterror: string = '';


  constructor(private supabaseService: SupabaseService, private router: Router){}

  ngOnInit() {
    this.loadUserEmail();
  }

  async loadUserEmail() {
    try {
      const user = await this.supabaseService.getCurrentUser();
      if (user) {
        this.email = user.email ?? '';
      } else {
        this.alerterror = 'No se pudo obtener el email';
      }
    } catch (error: any) {
      this.alerterror = `Error: ${error.message}`;
    }
  }

  async updateUser(){
    try{
      await this.supabaseService.updateUser(this.password);
      this.alerterror = '';
      window.alert('Contraseña cambiada con éxito!');
      this.router.navigate(['/account']);
    }catch (error:any) {
      this.alerterror = `Error: ${error.message}`
      this.alertsuccess = '';
    }
  }

}
