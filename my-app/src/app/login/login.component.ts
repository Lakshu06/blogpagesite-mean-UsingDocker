import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileForm: FormGroup;
  responseData = <any>{};

  submitted = false;
  constructor(fb: FormBuilder, private http: HttpClient,
    public router: Router,
    public authservice: AuthService) {
    this.profileForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.profileForm.controls; }
  ngOnInit(): void {
  }
  onSubmit() {
    this.submitted = true;

    this.http.post('http://localhost:3000/user/login', this.profileForm.value).subscribe((data) => {
      this.responseData = data;
      this.authservice.username = this.responseData.username;
      localStorage.setItem('username', this.authservice.username)
      if (this.responseData.message) {
        alert(this.responseData.message)
        window.location.reload();
      }
      else {
        localStorage.setItem('access_token', this.responseData.token);
        console.log(this.responseData)
        this.router.navigate(['/blog'])
      }

    });
  }
}
// profileForm: FormGroup;
// loading = false;
// submitted = false;
// returnUrl: string;

// constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private http: HttpClient,
//     private authService: AuthService,
//    ) { }

// ngOnInit() {
//     this.profileForm = this.formBuilder.group({
//         username: ['', Validators.required],
//         password: ['', Validators.required]
//     });

//     // get return url from route parameters or default to '/'
//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
// }

// // convenience getter for easy access to form fields
// get f() { return this.profileForm.controls; }

// onSubmit() {
//     this.submitted = true;



//     // stop here if form is invalid
//     if (this.profileForm.invalid) {
//         return;
//     }

//     this.loading = true;
//     this.http.post('http://localhost:3000/user/login', this.profileForm.value).subscribe(
//             data => {
//                 this.router.navigate([this.returnUrl]);
//             },
//             error => {

//                 this.loading = false;
//             });
// }
// }
