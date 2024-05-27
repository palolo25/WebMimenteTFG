import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassrecoverymodalComponent } from './passrecoverymodal.component';

describe('PassrecoverymodalComponent', () => {
  let component: PassrecoverymodalComponent;
  let fixture: ComponentFixture<PassrecoverymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassrecoverymodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassrecoverymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
