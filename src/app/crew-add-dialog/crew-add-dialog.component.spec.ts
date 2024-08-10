import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewAddDialogComponent } from './crew-add-dialog.component';

describe('CrewAddComponent', () => {
  let component: CrewAddDialogComponent;
  let fixture: ComponentFixture<CrewAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrewAddDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrewAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
