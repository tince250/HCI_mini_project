import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipesService';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: any;

  url: any = "https://spoonacular.com/recipeImages/716429-556x370.jpg";
  constructor(private recipesService: RecipesService){

  }

  ngOnInit(): void {
    this.recipe = this.recipesService.chosenRecipe;
    this.recipe.name = "ababa";
    // this.url = 
  }


}
