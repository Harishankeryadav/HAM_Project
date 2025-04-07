import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConsultationsComponent } from './get-consultations.component';

describe('GetConsultationsComponent', () => {
  let component: GetConsultationsComponent;
  let fixture: ComponentFixture<GetConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
