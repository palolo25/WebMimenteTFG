import { Component } from '@angular/core';
import { SupabaseService } from '../../app/supabase.service';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-passrecoverymodal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './passrecoverymodal.component.html',
  styleUrl: './passrecoverymodal.component.css'
})
export class PassrecoverymodalComponent {
  email: string = '';
  alertsuccess: string = '';
  alerterror: string = '';

  constructor(private supabaseService: SupabaseService){}

  async sendRecoveryEmail(){
    try{
      await this.supabaseService.resetPassword(this.email);
      this.alertsuccess = 'Si es correcto recibirás las instrucciones de recuperación'
      this.alerterror = '';
    } catch (error:any) {
      this.alerterror = `Error: ${error.message}`
      this.alertsuccess = '';
    }
  }

  closeModal() {
    const modalElement = document.getElementById('passwordRecoveryModal') as HTMLElement;
    const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
    modal.hide();
  }
}
