import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from '../services/recipesService';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, AfterViewInit {


  @ViewChild('ingredientScrollable')
  ingredientScrollableDiv: ElementRef;
  isIngredientScrollNeedable: boolean = false;

  recipe: any;
  url: any = "https://spoonacular.com/recipeImages/716429-556x370.jpg";
  constructor(private ref: ChangeDetectorRef, private recipesService: RecipesService){

  }
  ngAfterViewInit(): void {
    if (this.ingredientScrollableDiv.nativeElement.clientHeight > this.ingredientScrollableDiv.nativeElement.scrollHeight){
      this.isIngredientScrollNeedable = true;
    }
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.recipe = this.recipesService.chosenRecipe;
  }


}
