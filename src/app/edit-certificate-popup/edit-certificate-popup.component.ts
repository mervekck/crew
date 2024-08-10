import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-certificate-popup',
  templateUrl: './edit-certificate-popup.component.html',
  styleUrls: ['./edit-certificate-popup.component.css'],
})
export class CertificateDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { certificates: string[] },
    private dialogRef: MatDialogRef<CertificateDialogComponent> // Dialog referansı ekledik
  ) {}
  onCloseClick(): void {
    this.dialogRef.close(); // Popup'ı kapatır
  }
}
