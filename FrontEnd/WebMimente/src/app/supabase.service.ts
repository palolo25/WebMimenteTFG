import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'

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
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('name, email, imgprofile')
      .eq('uid', userId)
      .single();
      
    if (error && error.code === 'PGRST116') {
      throw new Error(`No user found with this id: ${userId} ${error.code}`);
    }
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    return data;
  }
}
