import { RecipesService } from './../services/recipesService';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';


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

  start_page = 0;
  end_page = 2;

  smallerDesktop: MediaQueryList;
  smallerDesktopFour: MediaQueryList;
  biggerDesktop: MediaQueryList;

  scrollable = false;
  noResults = false;
  errorMessage = "";
  noResultsMessage = "We're sorry! We don't have any recipes that match your preferences.";
  apiErrorMessage = "Oops! Something went wrong on our side. Try refreshing the page, if the problem persists - try again later.";

  constructor(private recipesService: RecipesService, private router: Router, private mediaMatcher: MediaMatcher) {
    this.biggerDesktop = mediaMatcher.matchMedia('(min-width: 1450px)');
    this.smallerDesktop = mediaMatcher.matchMedia('(min-width: 1160px) and (max-width: 1450px)');
    this.smallerDesktopFour = mediaMatcher.matchMedia('(min-width: 1100px) and (max-width: 1160px)');
  }

  ngOnInit(): void {
    this.noResults = false;

      // Set initial page size based on screen size
    this.setPageSize();

    // Subscribe to media query changes
    this.smallerDesktop.addEventListener('change', this.setPageSize);
    this.biggerDesktop.addEventListener('change', this.setPageSize);
    this.smallerDesktopFour.addEventListener('change', this.setPageSize);

    this.recipesService.getFetchedRecipes().subscribe((res) => {
      console.log(res);
      if (res != null ) {

        if (res.results.length == 0) {
          this.noResults = true;
          this.errorMessage = this.noResultsMessage;
          console.log("nema rezultata");
          this.totalResults = 0;
          return;
        }

        this.noResults = false;

        this.allFetchedRecipes = res.results;
        this.offset = res.offset;
        this.totalResults = res.totalResults;
        this.recipesSlice = this.allFetchedRecipes.slice(this.offset, this.pageSize);
      } 
      else {
        this.recipesService.getRandomRecipes(this.pageSize).subscribe({
          next: (res) => {
            this.allFetchedRecipes = res.recipes;
            this.totalResults = res.recipes.length;
            this.recipesSlice = this.allFetchedRecipes.slice(this.offset, this.pageSize);
            console.log(this.recipesSlice);
          }, 
          error: (err) => {
            console.log(err);
            this.noResults = true;
            this.errorMessage = this.apiErrorMessage;
          },
        });
      }

      
      console.log(this.recipesSlice);
    });
  }

  ngOnDestroy() {
    this.smallerDesktop.removeEventListener('change', this.setPageSize);
  }

  setPageSize = () => {
    console.log(this.smallerDesktop.matches)
    this.scrollable = false;
    if (this.biggerDesktop.matches) {
      this.pageSize = 8
    } else {
      if (this.smallerDesktop.matches) {
        this.pageSize = 6;
      } else {
        if (this.smallerDesktopFour.matches) {
          this.pageSize = 8;
        } else {
          this.pageSize = 6;
          this.scrollable = true;
        }
      }
    }
    
    this.updateData();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex;
    console.log(this.offset);
    if (this.offset > this.end_page || this.offset < this.start_page) {
      this.recipesService.offset = this.offset-1;
      this.recipesService.number = this.pageSize;
      this.recipesService.repeatQuery().subscribe({
        next: (res) => {
          console.log(res);
          this.start_page = this.offset - 1;
          this.end_page = this.start_page + 2;
          this.allFetchedRecipes = res.results;
          this.offset = (this.offset - this.start_page) % 3;
          this.updateData();
        },
        error: (err) => {
          console.log(err);
          this.noResults = true;
          this.errorMessage = this.apiErrorMessage;
        }
      });

    } else {
      this.offset = (this.offset - this.start_page) % 3;
      this.updateData();
    }
    
    
  }

  private updateData() {
    let startIndex = this.pageSize*this.offset;
    let endIndex = startIndex + this.pageSize;
    
    if (endIndex > this.allFetchedRecipes.length) {
      endIndex = this.allFetchedRecipes.length;
    }
    console.log(startIndex + " " + endIndex);
    this.recipesSlice = this.allFetchedRecipes.slice(startIndex, endIndex);
    console.log(this.recipesSlice)

    if (this.scrollable) {
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }

  openRecipeDetails(id: number) {
    this.recipesService.getById(716429).subscribe({
      next: (res) => {
        this.recipesService.chosenRecipe = res;
        console.log(res);
        // this.router.navigate(['/recipe-details']);
      },
      error: (err) => {
        console.log(err);
        this.noResults = true;
        this.errorMessage = "Oops! Something went wrong on our side. Try to open some other recipe, if the problem persists - try again later."
      },
    });
  }

}
