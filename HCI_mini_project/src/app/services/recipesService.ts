
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

    constructor(private http: HttpClient) {}

    setFetchedRecipes(recipes: any) {
        this.fetchedRecipes.next(recipes);
    }

    getFetchedRecipes(): Observable<any> {
        return this.fetchedRecipes.asObservable();
    }

    search(title: string, cusine: String, type:String, diet:String) : Observable<any> {
        let url = environment.search;
        if (title != '') 
            url = url + '&titleMatch=' + title;
            this.currTitle = title;
        if (cusine != '')
            url = url + '&cuisine=' + cusine;
            this.currCusine = cusine;
        if (type != '')
            url = url + '&type=' + type;
            this.currType = type;
        if (diet != '')
            url = url + '&diet=' + diet;
            this.currDiet = diet;

        this.lastUrl = url + '&offset=' + this.offset + '&number=' + this.number;
        return this.http.get<AllRecipesDTO>(this.lastUrl);
    }

    filter(form: FormGroup, gluten: boolean, dairy: boolean, included: String[], excluded: String[], cusine: String, type: String, diet:String) : Observable<any> {
        let url = environment.search;

        if (this.currCusine != '') 
            url = url + '&cuisine=' + this.currCusine;
        if (this.currType != '') 
            url = url + '&type=' + this.currType;
        if (this.currDiet != '') 
            url = url + '&diet=' + this.currDiet;
        if (this.currTitle != '') 
            url = url + '&titleMatch=' + this.currTitle;
        if (cusine != '')
            url = url + '&cuisine=' + cusine;
            this.currCusine = cusine;
        if (type != '')
            url = url + '&type=' + type;
            this.currType = type;
        if (diet != '')
            url = url + '&diet=' + diet;
            this.currDiet = diet;
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

        this.lastUrl = url + '&offset=' + this.offset + '&number=' + this.number;
        return this.http.get<AllRecipesDTO>(this.lastUrl);
    }


    recreateLastReq() : void {
        if (this.lastUrl != '')
            this.setFetchedRecipes(this.http.get<AllRecipesDTO>(this.lastUrl))
    }




    getByName(title: string) : Observable<AllRecipesDTO> {
        return this.http.get<AllRecipesDTO>(environment.search + "&titleMatch=" + title + "&addRecipeInformation=true");
    }

    getByNameAmount(title: string, amount:number) : Observable<AllRecipesDTO> {
        return this.http.get<AllRecipesDTO>(environment.search + "&titleMatch=" + title + "&number=" + amount);
    }

    getByCusine(cuisine: String) : Observable<AllRecipesDTO> {
        return this.http.get<AllRecipesDTO>(environment.search + "&cuisine=" + cuisine);
    }

    getByType(type: String) : Observable<AllRecipesDTO> {
        return this.http.get<AllRecipesDTO>(environment.search + "&type=" + type);
    }

    getByDiet(diet: String) : Observable<AllRecipesDTO> {
        return this.http.get<AllRecipesDTO>(environment.search + "&diet=" + diet);
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

