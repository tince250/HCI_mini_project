import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  allFetchedRecipes = [{name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}, {name: "Pizza Margarita"}];
  offset = 0;
  pageSize= 6;
  recipesSlice = this.allFetchedRecipes.slice(this.offset, this.pageSize);

  constructor() { }

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

}
