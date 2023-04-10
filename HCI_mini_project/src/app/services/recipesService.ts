
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
  })
export class RecipesService {

    private fetchedRecipes = new BehaviorSubject(null);

    public chosenRecipe: any;

    public number: number = 8;
    public offset: number = 0;
    public currTitle: String = '';
    public currCusine: String = '';
    public currType: String = '';
    public currDiet: String = '';
    public lastUrl: string = '';

    public lastQuery: string = "";

    constructor(private http: HttpClient) {}

    setFetchedRecipes(recipes: any) {
        this.fetchedRecipes.next(recipes);
    }

    getFetchedRecipes(): Observable<any> {
        return this.fetchedRecipes.asObservable();
    }

    repeatQuery() : Observable<any> {
        return this.http.get<AllRecipesDTO>(this.lastQuery + '&offset=' + this.offset*this.number + '&number=' + this.number*3);
    }

    search(title: string, cusine: String, type:String, diet:String) : Observable<any> {
        let url = environment.search;

        console.log(cusine);

        this.currTitle = title;
        this.currCusine = cusine;
        this.currType = type;
        this.currDiet = diet;

        if (title != '') {
            url = url + '&titleMatch=' + title;
        }  
        if (cusine != '') {
            url = url + '&cuisine=' + cusine;
            console.log(cusine);
        }    
        if (type != '') {
            url = url + '&type=' + type;
        }   
        if (diet != '') {
            url = url + '&diet=' + diet;     
        }
            

        this.lastQuery = url  + "&addRecipeInformation=true";
        return this.http.get<AllRecipesDTO>(this.lastQuery + '&offset=' + this.offset*this.number + '&number=' + this.number*3);
            

        // this.lastUrl = url + '&offset=' + this.offset + '&number=' + this.number;
        // return this.http.get<AllRecipesDTO>(this.lastUrl);
    }

    filter(form: FormGroup, gluten: boolean, dairy: boolean, included: String[], excluded: String[], cusine: String, type: String, diet:String) : Observable<any> {
        let url = environment.search;

        this.currCusine = cusine;
        this.currType = type;
        this.currDiet = diet;

        if (this.currCusine != '') 
            url = url + '&cuisine=' + this.currCusine;
        if (this.currType != '') 
            url = url + '&type=' + this.currType;
        if (this.currDiet != '') 
            url = url + '&diet=' + this.currDiet;
        if (this.currTitle != '') 
            url = url + '&titleMatch=' + this.currTitle;
        if (cusine != '') {
            url = url + '&cuisine=' + cusine;
        }    
        if (type != '') {
            url = url + '&type=' + type;
        }    
        if (diet != '') {
            url = url + '&diet=' + diet;
        } 
        if (form.value.prep_time) 
            url = url + '&maxReadyTime=' + form.value.prep_time;
        if (form.value.max_cal)
            url = url + '&maxCalories=' + form.value.max_cal
        if (form.value.min_cal)
            url = url + '&minCalories=' + form.value.min_cal
        if (gluten)
            url = url + '&diet=' + 'Gluten Free'
        if (dairy) 
            url = url + '&intolerances=' + 'dairy'
        if (included.length != 0)
            url = url + '&includeIngredients=' + included.join()
        if (excluded.length != 0)
            url = url + '&excludeIngredients=' + excluded.join()

        return this.http.get<AllRecipesDTO>(url + '&offset=' + this.offset*this.number + '&number=' + this.number + "&addRecipeInformation=true");
        // this.lastUrl = url + '&offset=' + this.offset + '&number=' + this.number;
        // return this.http.get<AllRecipesDTO>(this.lastUrl);
    }

    getById(id: number) : Observable<any> {
        return this.http.get<any>(environment.apiHost + id + "/information?includeNutrition=true&apiKey=" + environment.apiKey);
    }

    getRandomRecipes(amount: number) : Observable<any> {
        // https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert
        return this.http.get<any>(environment.apiHost + "/random?number=" + amount + "&apiKey=" + environment.apiKey);
    }
}


export interface Recipe {
    id: number;
    title: string;
    image: string;
    imageType: string;
}

export interface AllRecipesDTO {
    offset: number;
    number: number;
    results: Recipe[],
    totalResults: number
}

