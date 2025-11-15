import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { JobsComponent } from './pages/jobs/jobs';
import { CreateJobComponent } from './pages/jobs/create-job';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import DashboardComponent from './pages/dashboard/dashboard';
import { ProductsComponent } from './pages/products/products';
import { ProfileComponent } from './pages/profile/profile';
import { PostProjectComponent } from './pages/post-project/post-project';
import { JobDetailsComponent } from './pages/jobs/job-details';
import { ProductDetailsComponent } from './pages/products/product-details';
import { ApplicationsComponent } from './pages/applications/applications';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'jobs', component: JobsComponent },
    { path: 'jobs/create', component: CreateJobComponent },
    { path: 'jobs/:id', component: JobDetailsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'applications', component: ApplicationsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'post-project', component: PostProjectComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutComponent }
];