import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AllRecipesDTO, RecipesService } from '../services/recipesService';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  selected_cuisine: String = ''
  cuisine_dd: String[] = ['All', 'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese']
  selected_type: String = ''
  type_dd: String[] = ['All', 'main course',
    'side dish',
    'dessert',
    'appetizer',
    'salad',
    'bread',
    'breakfast',
    'soup',
    'beverage',
    'sauce',
    'marinade',
    'fingerfood',
    'snack',
    'drink']
  selected_diet: String = ''
  diet_dd: String[] = ['All', 'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30']

  searchForm = new FormGroup({
    search_bar: new FormControl(''),
  }, [])

  constructor(private service: RecipesService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('cao')
  }

  search() : void {
    this.service.search(this.searchForm.value.search_bar!, this.selected_cuisine, this.selected_type, this.selected_diet).subscribe((res) => {
      console.log(res)
      this.service.setFetchedRecipes(res);
    })
  }

  searchByCusine(c: String) : void {
    if (c == 'All')
      this.selected_cuisine = ''
    else
      this.selected_cuisine = c;
    this.search();
  }

  searchByType(c: String) : void {
    if (c == 'All')
      this.selected_type = ''
    else
      this.selected_type = c;
    this.search();
  }

  searchByDiet(c: String) : void {
    if (c == 'All')
      this.selected_diet = ''
    else
      this.selected_diet = c;
    this.search();
  }




  }


