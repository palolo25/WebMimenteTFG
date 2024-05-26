import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newemail',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './newemail.component.html',
  styleUrl: './newemail.component.css'
})
export class NewemailComponent {

  alertSuccess: string = '';
  alertError: string = '';

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const tokenHash = this.route.snapshot.queryParamMap.get('tokenHash');

    if (tokenHash) {
      try {
        const { user,session } = await this.supabaseService.confirmEmailChange(tokenHash);
        if (!user) {
          this.alertError = 'Error al obtener usuario';
        } else {
          this.alertSuccess = `Se ha cambiado el email correctamente a: ${user.email}`;
        }
      } catch (error: any) {
        this.alertError = 'Error: ' + error.message;
      }
    } else {
      this.alertError = 'Link de confirmación inválido';
    }
  }
}
