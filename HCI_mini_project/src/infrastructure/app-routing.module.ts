import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsHeaderComponent } from 'src/app/details-header/details-header.component';
import { RecipeCardsComponent } from 'src/app/recipe-cards/recipe-cards.component';
import { RecipeDetailsComponent } from 'src/app/recipe-details/recipe-details.component';
import { HomepageComponent } from 'src/app/homepage/homepage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  // {path: 'details-header', component: DetailsHeaderComponent},
  {path: 'recipe-details', component: RecipeDetailsComponent},
  {path: '**', component: HomepageComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
