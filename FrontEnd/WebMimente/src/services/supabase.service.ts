import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  
  private supabaseUrl = 'https://sxdevenwiplzwyspjbxj.supabase.co'
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZGV2ZW53aXBsend5c3BqYnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMDEzNjEsImV4cCI6MjAzMTc3NzM2MX0.Y6TiJ9celL1MNi4gcwzY0Fw4sJ3YY9UNuu_-RdrzUTA'
  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async signUp(email: string, password: string, name: string, professional: boolean) {
    const {data,error: signUpError } = await this.supabase.auth.signUp({ email, password });
    if(signUpError){
      throw signUpError;
    }

    const {data: insertData,error: insertError} = await this.supabase
    .from('users')
    .insert([
      {name,email,professional}
    ]);

    if(insertError) {
      throw insertError;
    }
    return {insertData};
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }

  async getCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return data.user;
  }
  async getUser() {
    const {data: { user }} = await this.supabase.auth.getUser();
    if (user) {
      return { user, error: null };
    } else {
      return { user: null, error: new Error('No user found') };
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  async resetPassword(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:4200/account/newpassword',
    });
    if (error) {
      throw error;
    }
  }

  async updateUser(password: string){
    const {error} = await this.supabase.auth.updateUser({ password: password });
    if (error) {
      throw error;
    }
  }

  async confirmEmailChange(tokenHash: string) {
    const { data, error } = await this.supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'email_change',
    });
    if (error) {
      throw error;
    }
    return data;
  }
  
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('name, email, imgprofile, professional')
      .eq('uid', userId)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async getProfProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('professionals')
      .select('bio, price, active, specialty')
      .eq('uid', userId)
      .single();
    if (error) {
      throw error;
    }
    return data;
  }

  async uploadProfilePicture(file: File) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const filePath = `${user.id}/profileimg.jpg`;
    const { error } = await this.supabase.storage.from('userimg').upload(filePath, file, { upsert: true });
    if (error) throw error;

    return {
      imgProfileUrl: `https://sxdevenwiplzwyspjbxj.supabase.co/storage/v1/object/public/userimg/${filePath}`
    };
  }

  async updateUserProfileImage(userId: string, imgProfileUrl: string) {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }else{
      const {error} = await this.supabase
      .from('users')
      .update({imgprofile: imgProfileUrl})
      .eq('uid', userId);

      if(error) {
        throw error;
      }
    }

  }

  async updateUserProfile(name: string, email:string) {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }else if (user.email != email){
     const { data, error } = await this.supabase.auth.updateUser({
      email: email},{
        emailRedirectTo: 'http://localhost:4200/account/newemail',
      });
      if (error) {
        throw error;
      }
    }else{
      const { error } = await this.supabase
      .from ('users')
      .update({name})
      .eq('uid', user.id);
      if(error) {
        throw error;
      }
    }
  }

  async updateProfProfile(bio:string,price:number,active:boolean,specialty:string){
    const user = await this.getCurrentUser();
    const {error} = await this.supabase
    .from ('professionals')
    .update({bio,price,active,specialty})
    .eq('uid', user.id);
    if(error) {
      throw error;
    }
  }

  async getActiveProfessionals() {
    const { data, error } = await this.supabase
      .from('professionals')
      .select('*')
      .eq('active', true);
  
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getProfByIdProfile(idProfile: string) {
    const { data, error } = await this.supabase
      .from('professionals')
      .select('*')
      .eq('id_profile', idProfile)
      .eq('active', true)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async checkExistingAppointment(idUser: string, date: String, idProf: string) {
    const { data, error} = await this.supabase
    .from('appointments')
    .select('*')
    .eq('id_user', idUser)
    .eq('date', date)
    .eq('id_prof',idProf)
    .not('state', 'eq', 'Cancelada')
    .single();

    if(error && error.code !== 'PGRST116') {
      throw new Error(error.message);
    }
    return data;
  }

  async createAppointment(appointment: any){
    const { data, error} = await this.supabase
    .from('appointments')
    .insert([appointment]);

    if(error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getUserAppointment(idUser: string): Promise<Appointment[]> {
    const { data, error } = await this.supabase
      .from('appointments')
      .select(`
        id,
        id_user,
        id_prof,
        date,
        start_time,
        end_time,
        state,
        est_price,
        professionals (
          name,
          users (imgprofile)
        )
      `)
      .eq('id_user', idUser);
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data.map((appointment: any) => ({
      id: appointment.id,
      id_user: appointment.id_user,
      id_prof: appointment.id_prof,
      date: appointment.date,
      start_time: appointment.start_time,
      end_time: appointment.end_time,
      price: appointment.est_price,
      state: appointment.state,
      profName: appointment.professionals.name,
      imgProf: appointment.professionals.users.imgprofile,
    }));
  }
  
  async cancelAppointment(appointmentId: string){
    const { error } = await this.supabase
      .from('appointments')
      .update({ state: 'Cancelada' })
      .eq('id', appointmentId);

    if (error) {
      throw new Error(error.message);
    }
  }

  async getProfAppointment(idProf: string){
    const { data, error } = await this.supabase
    .from('appointments')
    .select(`
      *,
      professionals (name)`)
    .eq('id_prof', idProf);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

}
