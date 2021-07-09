import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'model-form',
  template: `<form [formGroup]="myform" novalidate (ngSubmit)="onSubmit()">
      <fieldset formGroupName="name">
        <div class="form-group">
          <label for="">First Name</label>
          <input type="text" class="form-control" formControlName="firstName" />
        </div>
        <div class="form-group">
          <label for="">Last Name</label>
          <input type="text" class="form-control" formControlName="lastName" />
        </div>
      </fieldset>
      <div
        class="form-group"
        [ngClass]="{
          'has-success': myform.controls.email.valid,
          'has-danger': myform.controls.email.invalid
        }"
      >
        <label for="">Email</label>
        <input type="email" class="form-control" formControlName="email" />
        <div class="form-control-feedback" *ngIf = "myform.controls.email.invalid"><p>Email is required</p></div>
        <pre>valid? {{ myform.controls.email.valid }}</pre>
        <pre>Invalid? {{ myform.controls.email.invalid }}</pre>
      </div>
      <div class="form-group">
        <label for="">password</label>
        <input
          type="password"
          class="form-control"
          formControlName="password"
        />
      </div>
      <div class="form-group">
        <label>Language</label>
        <select class="form-control" formControlName="language">
          <option value="">Please select a language</option>
          <option *ngFor="let lang of langs" [value]="lang">{{ lang }}</option>
        </select>
      </div> <button typ="submit" class="btn btn-primary">Submit</button>
    </form>
    <pre class="form-group">{{ myform.value | json }}</pre>`,
})
export class modelFormComponent implements OnInit {
  myform: FormGroup;
  langs: string[] = ['English', 'Malayalam', 'German'];

  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      language: new FormControl(),
    });
  }
  onSubmit(){
    if(this.myform.valid){
      console.log("form submitted",this.myform.value);
      this.myform.reset();}}
}

@Component({
  selector: 'app1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myapp';
}
