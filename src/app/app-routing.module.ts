import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { DetailsComponent } from './details/details.component'

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'detail/:id', component:DetailsComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  {path:'', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
