import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    private httpClient: HttpClient = inject(HttpClient);

    private url: string = 'http://localhost:8080/muestras/componentes';

}