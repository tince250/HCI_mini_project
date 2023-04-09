
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class RecipesService {

    constructor(private http: HttpClient) {}

    getByName(title: string) : Observable<AllRecipesDTO> {
        const options: any = {
            responseType: 'json',
          };
        return this.http.get<AllRecipesDTO>(environment.search + "&titleMatch=" + title);
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

