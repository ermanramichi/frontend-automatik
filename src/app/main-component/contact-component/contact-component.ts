import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors} from '@angular/forms'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-component',
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule, FormsModule],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitted = false;
  submitError = false;

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.mk')) {
      return {
        invalidEmail: true
      };
    }
    return null;
  }



  private formspreeUrl = 'https://formspree.io/f/xanbdlar'
constructor(private route: ActivatedRoute,private fb: FormBuilder,private http: HttpClient){
this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      subject: ['', Validators.required],
      message: ['', Validators.required]

});
}


  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const el = document.getElementById(fragment);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 0); // wait for DOM to be ready
        }
      }
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitted = false;
      this.submitError = false;

      const formData = {
        email: this.contactForm.get('email')?.value,
        subject: this.contactForm.get('subject')?.value,
        message: this.contactForm.get('message')?.value,
        _replyto: this.contactForm.get('email')?.value
      };

      this.http.post(this.formspreeUrl, formData, {
        headers: {
          'Accept': 'application/json'
        }
      }).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitted = true;
          this.contactForm.reset();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitError = true;
          console.error('Form submission error:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
