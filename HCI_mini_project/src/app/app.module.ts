import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from 'src/infrastructure/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { DetailsHeaderComponent } from './details-header/details-header.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
=======
import { MatCheckboxModule } from '@angular/material/checkbox';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FilterComponent } from './filter/filter.component'
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 17359c583b6c50b1f5e884605d3beb3f853c79d2

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    DetailsHeaderComponent,
    RecipeDetailsComponent
=======
    HomepageComponent,
    SearchComponent,
    FilterComponent
>>>>>>> 17359c583b6c50b1f5e884605d3beb3f853c79d2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule 
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hideRequiredMarker: 'true' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
