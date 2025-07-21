import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EquipoService {
    private httpClient: HttpClient = inject(HttpClient);

    private url: string = 'http://localhost:8080/muestras/equipos';

    findAll(): Observable<any> {
        return this.httpClient.get(`${this.url}/all`);
    }

    findAllComponentsByIdEquipo(id: number): Observable<any> {
        return this.httpClient.get(`${this.url}/${id}/componentes`);
    }
}