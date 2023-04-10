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

  selected_cuisine: string = ''
  cuisine_dd: String[] = ['African',
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
  selected_type: string = ''
  type_dd: String[] = ['main course',
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
  selected_diet = ''
  diet_dd: String[] = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30']

  searchForm = new FormGroup({
    search_bar: new FormControl(''),
  }, [])

  constructor(private service: RecipesService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('cao')
  }

  search() : void {
    this.service.getByName(this.searchForm.value.search_bar!).subscribe((res) => {
      console.log(res)
      this.service.setFetchedRecipes(res);
    })
  }

  searchByCusine(c: String) : void {
    this.service.getByCusine(c).subscribe((res) => {
      console.log(res)
    })
  }

  searchByType(c: String) : void {
    this.service.getByType(c).subscribe((res) => {
      console.log(res)
    })
  }

  searchByDiet(c: String) : void {
    this.service.getByDiet(c).subscribe((res) => {
      console.log(res)
    })
  }




  }


