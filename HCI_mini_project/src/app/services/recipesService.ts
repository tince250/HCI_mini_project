
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class RecipesService {

    private fetchedRecipes = new BehaviorSubject(null);

    public chosenRecipe: any;

    constructor(private http: HttpClient) {}

    setFetchedRecipes(recipes: any) {
        this.fetchedRecipes.next(recipes);
    }

    getFetchedRecipes(): Observable<any> {
        return this.fetchedRecipes.asObservable();
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

