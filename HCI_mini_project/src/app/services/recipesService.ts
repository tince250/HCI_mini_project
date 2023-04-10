
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class RecipesService {

    public chosenRecipe: any;

    constructor(private http: HttpClient) {}

    getByName(title: string) : Observable<AllRecipesDTO> {
        return this.http.get<AllRecipesDTO>(environment.search + "&titleMatch=" + title);
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
        return this.http.get<any>(environment.apiHost + id + "/information?includeNutrition=true&apiKey=" + environment.apiKey)
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
