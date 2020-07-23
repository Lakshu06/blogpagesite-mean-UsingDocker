import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
// import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false
  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    public router: Router) {
    this.profileForm = fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    console.log(this.profileForm.controls);
    return this.profileForm.controls;
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.submitted = true
    let resData = <any>{};
    console.log(this.profileForm.value)
    this.http.post('http://localhost:3000/user/signup', this.profileForm.value).subscribe((data) => {
      resData = data;
      if (resData.created) {
        alert(resData.message)
        this.router.navigate(['/login'])
      }

    }, err => {
      alert("user Already exist")
      window.location.reload();
    })
  }
}
