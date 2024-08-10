import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertificatePopupComponent } from './edit-certificate-popup.component';

describe('EditCertificatePopupComponent', () => {
  let component: EditCertificatePopupComponent;
  let fixture: ComponentFixture<EditCertificatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCertificatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCertificatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
