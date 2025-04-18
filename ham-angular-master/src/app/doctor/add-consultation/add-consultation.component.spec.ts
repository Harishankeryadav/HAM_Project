import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultationComponent } from './add-consultation.component';

describe('AddConsultationComponent', () => {
  let component: AddConsultationComponent;
  let fixture: ComponentFixture<AddConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
