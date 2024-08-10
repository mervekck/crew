import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Currency, Title } from '../models/crew.model';

@Component({
  selector: 'app-crew-edit-dialog',
  templateUrl: './crew-edit-dialog.component.html',
  styleUrls: ['./crew-edit-dialog.component.css'],
})
export class CrewEditDialogComponent {
  crewForm: FormGroup;
  currencies = Object.values(Currency);
  Currency = Currency;

  titles = Object.values(Title);
  Title = Title;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrewEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.crewForm = this.fb.group({
      id: [data.id, Validators.required],
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      nationality: [data.nationality, Validators.required],
      title: [data.title, Validators.required],
      daysOnBoard: [data.daysOnBoard, [Validators.required, Validators.min(1)]],
      dailyRate: [data.dailyRate, [Validators.required, Validators.min(1)]],
      currency: [data.currency, Validators.required],
      totalIncome: [data.totalIncome],
    });
  }

  onSave(): void {
    if (this.crewForm.invalid) {
      this.crewForm.markAllAsTouched(); // Formu doğrulama ve hata mesajlarını göstermek için işaretler
      return;
    }

    const dailyRate = this.crewForm.get('dailyRate')?.value || 0;
    const daysOnBoard = this.crewForm.get('daysOnBoard')?.value || 0;
    const totalIncome = dailyRate * daysOnBoard;

    this.crewForm.patchValue({ totalIncome });
    this.dialogRef.close(this.crewForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
