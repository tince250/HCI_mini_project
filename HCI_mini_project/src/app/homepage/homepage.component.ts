import { RecipesService } from './../services/recipesService';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  allFetchedRecipes = [];
  offset = 0;
  pageSize= 8;
  totalResults = 0;
  recipesSlice: any;

  constructor(private recipesService: RecipesService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.recipesService.getFetchedRecipes().subscribe((res) => {
      console.log(res);
      if (res != null) {
        this.allFetchedRecipes = res.results;
        this.offset = res.offset;
        this.totalResults = res.totalResults;
        this.recipesSlice = this.allFetchedRecipes.slice(this.offset, this.pageSize);
      } 
      else {
        // this.recipesService.getRandomRecipes(this.pageSize).subscribe({
        //   next: (res) => {
        //     this.allFetchedRecipes = res.recipes;
        //     this.totalResults = res.recipes.length;
        //     this.recipesSlice = this.allFetchedRecipes.slice(this.offset, this.pageSize);
        //     console.log(this.recipesSlice);
        //   }, 
        //   error: (err) => {
        //     console.log(err);
        //   },
        // });
      }

      
      console.log(this.recipesSlice);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex;
    let startIndex = this.pageSize*this.offset;
    let endIndex = startIndex + this.pageSize;
    if (endIndex > this.allFetchedRecipes.length) {
      endIndex = this.allFetchedRecipes.length;
    }
    this.recipesSlice = this.allFetchedRecipes.slice(startIndex, endIndex);
    
  }

  openRecipeDetails(id: number) {
    this.recipesService.getById(716429).subscribe({
      next: (res) => {
        this.recipesService.chosenRecipe = res;
        console.log(res);
        // this.router.navigate(['/recipe-details']);
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

}
