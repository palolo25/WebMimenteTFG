import { Component } from '@angular/core';
import { AccountComponent } from '../account/account.component';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accnavbar',
  standalone: true,
  imports: [AccountComponent,SearchComponent,RouterModule],
  templateUrl: './accnavbar.component.html',
  styleUrl: './accnavbar.component.css'
})
export class AccnavbarComponent {

}
