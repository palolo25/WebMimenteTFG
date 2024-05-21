import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdatamodalComponent } from './editdatamodal.component';

describe('EditdatamodalComponent', () => {
  let component: EditdatamodalComponent;
  let fixture: ComponentFixture<EditdatamodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditdatamodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditdatamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
