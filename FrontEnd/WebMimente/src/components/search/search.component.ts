import { Component } from '@angular/core';
import { AccnavbarComponent } from '../accnavbar/accnavbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../app/supabase.service';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AccnavbarComponent,FooterComponent,RouterModule,CommonModule,NgbPaginationModule,FormsModule,NgbDropdownModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  professionals: any[] = [];
  paginatedProfessionals: any[] = [];
  filteredProfessionals: any[] = [];
  contentLoading:boolean = true;
  page: number = 1;
  pageSize: number = 6;
  totalItems: number = 0;
  alertInfo: string | null = null;
  private supabaseUrl: string = 'https://sxdevenwiplzwyspjbxj.supabase.co/storage/v1/object/public/userimg';
  //Search and Filters
  searchText: string = '';
  selectedSpecialties: string[] = [];
  selectAllSpecialties: boolean = true;
  selectedPriceRange: string = 'cualquiera';
  sortOrder: string = '';
  availableSpecialties: string[] = ['Psicología', 'Psiquiatría', 'Psicología Clínica', 'Psicología Infantil', 'Neuropsicología', 'Psicología de la Adolescencia', 'Psicología Geriátrica', 'Psicología de la Personalidad', 'Psicología Social', 'Psicología del Trabajo'];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.professionals = await this.supabaseService.getActiveProfessionals();

      this.filterAndSortProfessionals();
    } catch (error: any) {
      this.alertInfo = `Error fetching professionals: ${error.message}`;
    } finally {
      this.contentLoading = false;
    }
  }

  constructProfileImageUrl(uid: string): string {
    return `${this.supabaseUrl}/${uid}/profileimg.jpg`;
  }

  viewDetails(idProfile: number) {
    window.location.href = `/account/search/details?id_profile=${idProfile}`;
  }

  onSpecialtyChange(event: any, specialty: string) {
    if (event.target.checked) {
      this.selectedSpecialties.push(specialty);
    } else {
      const index = this.selectedSpecialties.indexOf(specialty);
      if (index > -1) {
        this.selectedSpecialties.splice(index, 1);
      }
    }
    this.selectAllSpecialties = this.selectedSpecialties.length === this.availableSpecialties.length;
    this.filterAndSortProfessionals();
  }

  toggleAllSpecialties(event: any) {
    if (event.target.checked) {
      this.selectedSpecialties = [...this.availableSpecialties];
    } else {
      this.selectedSpecialties = [];
    }
    this.filterAndSortProfessionals();
  }

  filterAndSortProfessionals() {
    let filtered = this.professionals;

    // Filter by Name
    if (this.searchText) {
      filtered = filtered.filter(prof => prof.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    // Filter by specialties
    if (!this.selectAllSpecialties && this.selectedSpecialties.length > 0) {
      filtered = filtered.filter(prof =>
        this.selectedSpecialties.includes(prof.specialty)
      );
    }

    // Filter by price
    if (this.selectedPriceRange !== 'cualquiera') {
      const priceLimit = parseFloat(this.selectedPriceRange.substring(1));
      filtered = filtered.filter(prof => prof.price < priceLimit);
    }

    // Sort the results
    switch (this.sortOrder) {
      case 'nameAsc':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'specialtyAsc':
        filtered = filtered.sort((a, b) => a.specialty.localeCompare(b.specialty));
        break;
    }

    this.filteredProfessionals = filtered;
    this.updatePaginatedProfessionals();
  }

  updatePaginatedProfessionals() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProfessionals = this.filteredProfessionals.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.page = page;
    this.updatePaginatedProfessionals();
  }

}
