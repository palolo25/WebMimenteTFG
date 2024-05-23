import { Component } from '@angular/core';
import { AccnavbarComponent } from '../accnavbar/accnavbar.component';
import { FooterComponent } from '../footer/footer.component';
import { SupabaseService } from '../../app/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AccnavbarComponent,FooterComponent,CommonModule,FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  //User data
  name: string = '';
  editName: string = '';
  email: string = '';
  editEmail: string = '';
  imgprofile: string = '';
  selectedFile: File | null = null;
  //Professional data
  bio: string = '';
  editBio: string = '';
  price: string = '';
  editPrice: string = '';
  active: boolean = false;
  editActive: boolean = false;
  activeName: string = '';
  //Alert
  alerterror: string = '';
  //Other conditionals
  isLoading: boolean = true;
  modalIsLoading: boolean = false;
  isProfessional: boolean = false;

  
  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadUserProfile();
    if(this.isProfessional){
      this.loadProfProfile();
    }
    this.isLoading = false;

  }
  openEditPhotoModal() {
    const modalElement = document.getElementById('editPhotoModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  async uploadProfilePicture() {
    if (this.selectedFile) {
      try {
        const { imgProfileUrl } = await this.supabaseService.uploadProfilePicture(this.selectedFile);
        const user = await this.supabaseService.getCurrentUser();
        await this.supabaseService.updateUserProfileImage(user.id, imgProfileUrl);

        this.imgprofile = imgProfileUrl;

        this.closeModal('editPhotoModal');
      } catch (error: any) {
        console.error('Error uploading profile picture', error);
        window.alert(`Error: ${error.message}`);
      }
    }
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
          this.isProfessional = profile.professional ?? false;
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

  async loadProfProfile(){
    try{
      const user = await this.supabaseService.getCurrentUser();
      if (user && user.id) {
        const profProfile = await this.supabaseService.getProfProfile(user.id);
        if (profProfile) {
          this.bio = profProfile.bio ?? 'Sin bio';
          this.price = profProfile.price ?? 'Sin Precio';
          this.active = profProfile.active ?? false;
          if (this.active){
            this.activeName = 'Publicado'
          } else {
            this.activeName = 'Oculto';
          }
        } else {
          this.alerterror = 'No se pudo obtener la información del perfil del usuario.';
        }
      } else {
        this.alerterror = 'No se pudo obtener la información del usuario.';
      }
    } catch (error: any){
      this.alerterror = `Error: ${error.message}`;
    }
  }

  openEditDataModal() {
    this.modalIsLoading = false;
    const modalElement = document.getElementById('editDataModal') as HTMLElement;
    const modal = new Modal(modalElement, {
      keyboard: false
    });
    modal.show();
  }
  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
    modal.hide();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async updateUserData() {
    this.modalIsLoading = true;
    if(!this.isProfessional){
      if (!this.editName ) {
      this.editName = this.name;
      }
      if (!this.editEmail){
        this.editEmail = this.email;
      }
      if (this.editName === this.name && this.editEmail === this.email) {
        this.closeModal('editDataModal');
        return;
      }
      try {
        await this.supabaseService.updateUserProfile(this.editName, this.editEmail);
        this.name = this.editName;
        this.closeModal('editDataModal');
      } catch (error: any) {
        console.error('Error updating user data', error);
        window.alert(`Error updating user data: ${error.message}`);
      }
    }else{
      if (!this.editName ) {
        this.editName = this.name;
        }
        if (!this.editEmail){
          this.editEmail = this.email;
        }
        if (!this.editBio){
          this.editBio = this.bio;
        }
        if (!this.editPrice){
          this.editPrice = this.price;
        }
        if (!this.editActive){
          this.editActive = this.active;
        }
        if (this.editName !== this.name) {
          try {
            await this.supabaseService.updateUserProfile(this.editName, this.editEmail);
            this.name = this.editName;
          } catch (error: any) {
            console.error('Error updating user data', error);
            window.alert(`Error updating user data: ${error.message}`);
          }
        }
        try{
          await this.supabaseService.updateProfProfile(this.bio, this.price, this.active);
          this.bio = this.editBio;
          this.price = this.editPrice;
          this.active = this.editActive;
          if (this.active){
            this.activeName = 'Publicado'
          } else {
            this.activeName = 'Oculto';
          }
          this.modalIsLoading = false;
          this.closeModal('editDataModal')

        }catch (error: any) {
          console.error('Error updating professional data', error);
          window.alert(`Error updating professional data: ${error.message}`);
        }

    }
  }
  
}
