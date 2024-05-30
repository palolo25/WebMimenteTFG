import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accnavbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './accnavbar.component.html',
  styleUrl: './accnavbar.component.css'
})
export class AccnavbarComponent {

  isProfessional: boolean = false;
  isLoading: boolean = true;
  professionalId: number = 0;

  constructor(private supabaseService: SupabaseService, private router: Router) {}
  
  async ngOnInit() {
    try {
      const user = await this.supabaseService.getCurrentUser();
      if (user) {
        const profile = await this.supabaseService.getUserProfile(user.id);
        if (profile){
          this.isProfessional = profile.professional;
          if(this.isProfessional){
            const professional = await this.supabaseService.getProfProfile(user.id);
            this.professionalId = professional.id_profile
          }
        } else {
          console.error(`Error al buscar perfil: ${user.id}`);
        }
      }
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      await this.supabaseService.signOut();
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error al cerrar sesión', error);
      window.alert(`Error al cerrar sesión: ${error.message}`);
    }
  }

}
