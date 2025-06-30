import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  emailFm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.forms();
  }

  forms() {
    this.emailFm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    });
  }


}
