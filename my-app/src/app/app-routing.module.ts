import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuard } from './auth.guard';
import { HomeGuard } from './home.guard';
import { BlogGuard } from './blog.guard';
const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuard],
  data: { title: 'Blog Home' }

},
{
  path: 'login',
  component: LoginComponent,
  canActivate: [HomeGuard],
  data: { title: 'login' }

},
{
  path: 'signup',
  component: SignupComponent,
  canActivate: [HomeGuard],
  data: { title: 'Register' }

},
{
  path: 'blog',
  canActivate: [BlogGuard],
  component: BlogComponent,

  data: { title: 'Blog' }

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
