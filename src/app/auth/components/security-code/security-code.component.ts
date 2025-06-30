import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-code',
  templateUrl: './security-code.component.html',
  styleUrls: ['./security-code.component.scss']
})
export class SecurityCodeComponent implements OnInit {


  hide = signal<boolean>(false);
  securityFm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.forms();
  }

  forms() {
    this.securityFm = this.fb.group({

      verifyCode:['', [Validators.required, Validators.minLength(6),Validators.pattern('^[0-9]+$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(12),Validators.pattern('^[0-9]+$')]],
    });
  }


}
