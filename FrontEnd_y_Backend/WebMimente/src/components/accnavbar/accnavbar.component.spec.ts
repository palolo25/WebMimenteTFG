import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccnavbarComponent } from './accnavbar.component';

describe('AccnavbarComponent', () => {
  let component: AccnavbarComponent;
  let fixture: ComponentFixture<AccnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccnavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
