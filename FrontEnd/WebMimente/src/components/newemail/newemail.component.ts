import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../app/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newemail',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './newemail.component.html',
  styleUrl: './newemail.component.css'
})
export class NewemailComponent {

  alertsuccess: string = '';
  alerterror: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const tokenHash = this.route.snapshot.queryParamMap.get('tokenHash');

    if (tokenHash) {
      try {
        const { user,session } = await this.supabaseService.confirmEmailChange(tokenHash);
        if (!user) {
          this.alerterror = 'Error al obtener usuario';
        } else {
          this.alertsuccess = `Se ha cambiado el email correctamente a: ${user.email}`;
        }
      } catch (error: any) {
        this.alerterror = 'Error: ' + error.message;
      }
    } else {
      this.alerterror = 'Link de confirmación inválido';
    }
  }
}
