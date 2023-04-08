import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsHeaderComponent } from 'src/app/details-header/details-header.component';

const routes: Routes = [
  {path: 'details-header', component: DetailsHeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
