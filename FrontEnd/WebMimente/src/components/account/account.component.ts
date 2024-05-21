import { Component } from '@angular/core';
import { AccnavbarComponent } from '../accnavbar/accnavbar.component';
import { FooterComponent } from '../footer/footer.component';
import { SupabaseService } from '../../app/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccnavbarComponent,FooterComponent,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  name: string = '';
  email: string = '';
  imgprofile: string = '';
  alerterror: string = '';

  
  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const user = await this.supabaseService.getCurrentUser();
      if (user && user.id) {
        const profile = await this.supabaseService.getUserProfile(user.id);
        if (profile) {
          this.name = profile.name ?? 'Sin nombre';
          this.email = profile.email ?? 'Sin email';
          this.imgprofile = profile.imgprofile ?? 'default';
        } else {
          this.alerterror = 'No se pudo obtener la información del perfil del usuario.';
        }
      } else {
        this.alerterror = 'No se pudo obtener la información del usuario.';
      }
    } catch (error: any) {
      this.alerterror = `Error: ${error.message}`;
    }
  }

  editData(){
    this.alerterror = 'Próxima funcionalidad';
  }

}
