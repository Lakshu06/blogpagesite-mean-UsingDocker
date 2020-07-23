import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogForm: FormGroup;
  username: String;
  blog_Data = <any>{};
  constructor(fb: FormBuilder,
    private http: HttpClient,
    public route: ActivatedRoute,
    public router: Router,
    public auth: AuthService) {
    this.blogForm = fb.group({
      title: [''],
      description: ['']
    });
  }
  ngOnInit(): void {
    // this.username = this.route.snapshot.paramMap.get('username');
    this.username = localStorage.getItem('username');
    // this.username = this.auth.username;
    this.http.get('http://localhost:3000/blog/get').subscribe((resp) => {
      this.blog_Data = resp
      console.log(this.blog_Data.post)
    });
  }
  onSubmit() {
    var blogData = <any>{};
    this.blogForm.value.username = this.username;

    console.log(this.blogForm.value)
    this.http.post('http://localhost:3000/blog/create', this.blogForm.value).subscribe((data) => {
      blogData = data
      alert(blogData.message)
      console.log(data)
      if (blogData.message) {
        window.location.reload();

      }
    });
  }
  deletePost(id, title) {
    if (confirm("Are you sure to delete " + title)) {
      this.http.delete('http://localhost:3000/blog/' + id).subscribe((data) => {
        window.location.reload();
      });
    }
    console.log(id)
  }
  logout() {
    if (confirm("Are you sure to logout ")) {
      this.auth.logout();
    }

  }

}

