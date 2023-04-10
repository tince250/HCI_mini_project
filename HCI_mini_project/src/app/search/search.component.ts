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

  included_ing: String[] = ['s']
  searchForm = new FormGroup({
    prep_time: new FormControl(0, [Validators.required, prepTimeValidator]),
    max_cal: new FormControl(0),
    min_cal: new FormControl(0),
    include_ing: new FormControl(''),
    exclude_ing: new FormControl(''),
  }, [])

  gluten_checked: boolean = false
  dairy_checked: boolean = false
  included: String[] = []
  excluded: String[] = []
  
  search() : void {
    this.service.filter(this.searchForm, this.gluten_checked, this.dairy_checked, this.included, this.excluded).subscribe((res) => {
      console.log(res)
      this.service.setFetchedRecipes(res);
    })
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
}
