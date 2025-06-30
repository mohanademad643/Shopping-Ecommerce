import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Contact } from 'src/app/Models/Contact';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  ConcatForm!: FormGroup;
  private fb = inject(FormBuilder);
  private sharedService = inject(SharedService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  constructor() {
    this.ConcatForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-2]\d{8}$/)]],
      subject: ['', Validators.required],
      description: ['', Validators.required],

    });
  }


  onSubmit(): void {
    if (this.ConcatForm.valid) {
      const formData = this.ConcatForm.value;

      const ContactData: Contact = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        subject: formData.subject,
        description: formData.description,
      };

      this.sharedService
        .sendContactForm(ContactData).pipe(tap((response) => {

          console.log('Form submitted successfully:', response);
          this.ConcatForm.reset();
        }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: ()=> this.openSuccessDialog(),
          error: (err) => {
            console.error('Error submitting form:', err);
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
