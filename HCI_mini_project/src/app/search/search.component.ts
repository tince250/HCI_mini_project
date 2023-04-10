import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { prepTimeValidator } from '../validators/searchValidators';
import { RecipesService } from '../services/recipesService';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html', 
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(private service: RecipesService) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.')
    console.log('cao')
  }


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





  included_ing: String[] = ['s']
  searchForm = new FormGroup({
    prep_time: new FormControl('', [Validators.required, prepTimeValidator]),
    max_cal: new FormControl(''),
    min_cal: new FormControl(''),
    include_ing: new FormControl(''),
    exclude_ing: new FormControl(''),
  }, [])

  

  gluten_checked: boolean = false
  dairy_checked: boolean = false
  included: String[] = []
  excluded: String[] = []
  
  search() : void {
    this.service.filter(this.searchForm, this.gluten_checked, this.dairy_checked, this.included, this.excluded, this.selected_cuisine, this.selected_type, this.selected_diet).subscribe({
      next: (res: any) => {
        console.log(res)
        this.service.setFetchedRecipes(res);
      },
      error: (error: any) => {
        console.log("Server is not responding.")
      }
    });
    if (window.innerWidth < 1000)
        this.closeFilter();
  }

  toggle_gluten(): void {
    this.gluten_checked = !this.gluten_checked;
  }

  toggle_dairy(): void {
    this.dairy_checked = !this.dairy_checked;
  }

  add_included(): void {
    if (this.searchForm.value.include_ing) {
      if (!this.included.includes(this.searchForm.value.include_ing)) {
        this.included.push(this.searchForm.value.include_ing);
        if (this.excluded.includes(this.searchForm.value.include_ing)) {
          this.remove_excluded(this.searchForm.value.include_ing)
        }
      }  
    }
  }

  add_excluded(): void {
    if (this.searchForm.value.exclude_ing) {
      if (!this.excluded.includes(this.searchForm.value.exclude_ing)) {
        this.excluded.push(this.searchForm.value.exclude_ing);
        if (this.included.includes(this.searchForm.value.exclude_ing)) {
          this.remove_included(this.searchForm.value.exclude_ing)
        }
      }
    }
  }

  remove_included(name: String): void {
    this.included = this.included.filter(item => item != name);
  }

  remove_excluded(name: String): void {
    this.excluded = this.excluded.filter(item => item != name);
  }

  clear_lists(): void {
    this.included = [];
    this.excluded = [];
  }




  searchByCusine(c: String) : void {
    if (c == 'All')
      this.selected_cuisine = ''
    else
      this.selected_cuisine = c;
  }

  searchByType(c: String) : void {
    if (c == 'All')
      this.selected_type = ''
    else
      this.selected_type = c;
 }

  searchByDiet(c: String) : void {
    if (c == 'All')
      this.selected_diet = ''
    else
      this.selected_diet = c;
  }

  closeFilter(): void {
    const search = document.getElementsByTagName('app-search')[0] as HTMLElement;
    const filter = document.getElementsByTagName('app-filter')[0] as HTMLElement;
    const homep = document.getElementsByTagName('app-homepage')[0] as HTMLElement;

    if(filter) {
      search.style.display = "none";
      filter.style.display = "block";
      homep.style.display = "block";
    }
  }
}
