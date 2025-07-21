import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    private httpClient: HttpClient = inject(HttpClient);

    private url: string = 'http://localhost:8080/muestras/componentes';

    public save(data: any): Observable<any> {
        return this.httpClient.post(this.url + "/crear", data);
    }
}