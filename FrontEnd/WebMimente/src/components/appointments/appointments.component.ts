import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Modal } from 'bootstrap';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule,TableModule,IconFieldModule,InputIconModule,FormsModule,InputTextModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  isProfessional: boolean = false;
  isLoading: boolean = true;
  appointments:any[] = [];
  modalIsLoading: boolean = false;
  alertError: string = '';
  selectedAppointment: Appointment | null = null;

  constructor(private supabaseService: SupabaseService){}

  async ngOnInit() {
    try {
      const user = await this.supabaseService.getCurrentUser();
      if (user) {
        const profile = await this.supabaseService.getUserProfile(user.id);
        if (profile){
          this.isProfessional = profile.professional;
          if(!this.isProfessional){
            this.loadUserAppointments(user.id);
          }else{
            this.loadProfAppointments(user.id);
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

  async loadUserAppointments(userId:string){
    try{
      this.appointments = await this.supabaseService.getUserAppointment(userId);
    } catch (error: any) {
      window.alert(`Error al cargar citas: ${error.message}`);
    }
  }

  async loadProfAppointments(userId:string){

  }

  filterTable(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value !== null) {
      dt.filterGlobal(inputElement.value, 'contains');
    }
  }

  openAppointmentModal(appointment: Appointment) {
    this.alertError = '';
    this.modalIsLoading = false;
    this.selectedAppointment = appointment;
    const modalElement = document.getElementById('appointmentModal') as HTMLElement;
    const modal = new Modal(modalElement);
    modal.show();
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
    modal.hide();
  }

  async cancelAppointment() {
    if (this.selectedAppointment) {
      try {
        await this.supabaseService.cancelAppointment(this.selectedAppointment.id);
        this.selectedAppointment.state = 'Cancelada';
        this.alertError = 'Cita cancelada con éxito';
      } catch (error: any) {
        this.alertError = `Error al cancelar cita: ${error.message}`;
      }
    }
  }
}
