import { Component } from '@angular/core';
import { AccnavbarComponent } from '../accnavbar/accnavbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { availableTimes, extendedTimes } from '../../app/constants/times';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule,AccnavbarComponent,FooterComponent,CommonModule,FormsModule,NgbDatepicker],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  isProfessional: boolean = false;
  professional: any;
  supabaseUrl: string = 'https://sxdevenwiplzwyspjbxj.supabase.co/storage/v1/object/public/userimg';
  profileImage: string = '';
  alertError: string | null = null;
  session: boolean = false;
  //Selection
  model: any;
  startTime: string | null = null;
  duration: number = 1;
  selectedDate: string | null = null;
  endTime: string | null = null;
  estimatedPrice: number | null = null;
  availableTimes: string[] =  availableTimes;
  extendedTimes: string[] = extendedTimes;

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit(){
    const { user } = await this.supabaseService.getUser();
    if (user) {
      this.session = true;
      const profile = await this.supabaseService.getUserProfile(user.id);
      if (profile){
        this.isProfessional = profile.professional;
      }
    } else {this.session = false;}
    const idProfile = this.route.snapshot.queryParamMap.get('id_profile');
    if(idProfile) {
      try{
        this.professional = await this.supabaseService.getProfByIdProfile(idProfile);
        const uid = this.professional.uid;
        this.profileImage = `${this.supabaseUrl}/${uid}/profileimg.jpg`;
      } catch (error: any){
        this.alertError = 'Error accediendo al profesional';
      }
    }
  }   

  onDateChange() {
    if (this.model) {
      const date = new Date(this.model.year, this.model.month - 1, this.model.day);
      this.selectedDate = date.toLocaleDateString('es-ES');
    } else {
      this.selectedDate = null;
    }
    this.updateSelection();
  }

  updateSelection() {


    if (this.startTime) {
      const startIndex = this.availableTimes.indexOf(this.startTime);
      if (startIndex !== -1) {
        const endIndex = startIndex + (this.duration * 2); 
        if (endIndex < this.availableTimes.length) {
          this.endTime = this.availableTimes[endIndex];
        } else if (endIndex >= this.availableTimes.length && endIndex <= this.availableTimes.length + 8) {

          const extendedEndIndex = endIndex - this.availableTimes.length;
          this.endTime = this.extendedTimes[extendedEndIndex];
        } else {
          this.endTime = null;
        }
      } else {
        this.endTime = null;
      }
    } else {
      this.endTime = null;
    }
  
    this.estimatedPrice = this.professional ? this.professional.price * this.duration : null;
  }

  async requestAppointment() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const selectedDate = new Date(this.model.year, this.model.month - 1, this.model.day);
  
    if (selectedDate <= currentDate) {
      const todayFormatted = currentDate.toLocaleDateString('es-ES');
      this.alertError = `Selecciona una fecha posterior a hoy (${todayFormatted})`;
    } else {
      this.alertError = '';

      try{
        const user = await this.supabaseService.getCurrentUser();
        const idUser = user.id;
        const idProf = this.professional.uid;
        const formattedDate = `${this.model.year}-${String(this.model.month).padStart(2, '0')}-${String(this.model.day).padStart(2, '0')}`;

        const existingAppointment = await this.supabaseService.checkExistingAppointment(idUser, formattedDate, idProf);

        if (existingAppointment){
          window.alert('Ya existe una cita para ese día, selecciona otra fecha o cancélala desde tu cuenta');
        } else {
          await this.supabaseService.createAppointment({
            id_user: idUser,
            id_prof: idProf,
            state: 'Solicitada',
            date: formattedDate,
            start_time: this.startTime,
            end_time: this.endTime,
            est_price: this.estimatedPrice
          });
          window.alert('Cita Solicitada con éxito');
        }
      }catch (error: any){
        this.alertError = `Error al solicitar la cita: ${error.message}`;

      }
    }
  }



}
