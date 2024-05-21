import { Component } from '@angular/core';
import { AccountComponent } from '../account/account.component';
import { SearchComponent } from '../search/search.component';
import { Router,RouterModule } from '@angular/router';
import { SupabaseService } from '../../app/supabase.service';

@Component({
  selector: 'app-accnavbar',
  standalone: true,
  imports: [AccountComponent,SearchComponent,RouterModule],
  templateUrl: './accnavbar.component.html',
  styleUrl: './accnavbar.component.css'
})
export class AccnavbarComponent {
  
  constructor(private supabaseService: SupabaseService, private router: Router) {}
  
  async logout() {
    try {
      await this.supabaseService.signOut();
      window.alert('Sesión cerrada con éxito');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error al cerrar sesión', error);
      window.alert(`Error al cerrar sesión: ${error.message}`);
    }
  }

}
