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

  @ViewChild('directionScrollable')
  directionScrollableDiv: ElementRef;
  isDirectionScrollNeedable: boolean = false;
  firstOption: boolean = true;
  responsiveOptions: boolean = false; 
  imageError: boolean = false; 

  recipe: any;
  constructor(private ref: ChangeDetectorRef, private recipesService: RecipesService){

  }
  ngAfterViewInit(): void {
    if (this.ingredientScrollableDiv.nativeElement.clientHeight > this.ingredientScrollableDiv.nativeElement.scrollHeight){
      this.isIngredientScrollNeedable = true;
    }
    if (this.directionScrollableDiv.nativeElement.clientHeight > this.directionScrollableDiv.nativeElement.scrollHeight){
      this.isDirectionScrollNeedable = true;
    }
    this.ref.detectChanges();
  }

  clickedSecond(){
    this.firstOption = false;
    if (!this.responsiveOptions)
      this.responsiveOptions = true;
    this.ref.detectChanges();
  }

  clickedFirst(){
    this.firstOption = true;
    if (!this.responsiveOptions)
      this.responsiveOptions = true;
    this.ref.detectChanges();
  }

  imageNotLoaded() {
    this.imageError = true;
  }

  ngOnInit(): void {
    this.recipe = this.recipesService.chosenRecipe;
  }


}
