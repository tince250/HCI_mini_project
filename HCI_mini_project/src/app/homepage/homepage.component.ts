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

  allFetchedRecipes = [{name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}, {name: "Pizza Margarita", id: 1}];
  offset = 0;
  pageSize= 6;
  recipesSlice = this.allFetchedRecipes.slice(this.offset, this.pageSize);

  constructor(private recipesService: RecipesService, private router: Router) { }

  ngOnInit(): void {
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
        console.log(res.id);
        console.log(res);
        this.router.navigate(['/recipe-details']);
      },
      error: (err) => {
        console.log(err)
      },
    });
  }
  //this.router.navigate(['../recipe-details']);
  // }
}
//}

