import { Component } from '@angular/core';
import { AccnavbarComponent } from '../accnavbar/accnavbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService } from '../../app/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule,AccnavbarComponent,FooterComponent,CommonModule,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  professional: any;
  supabaseUrl: string = 'https://sxdevenwiplzwyspjbxj.supabase.co/storage/v1/object/public/userimg';
  profileImage: string = '';
  alertError: string | null = null;

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService) {}

  async ngOnInit(){
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

}
