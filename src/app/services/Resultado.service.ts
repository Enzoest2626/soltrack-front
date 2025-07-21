import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ResultadoService {

    private httpClient: HttpClient = inject(HttpClient);

    private url: string = 'http://localhost:8080/resultados/resultados';

    public save(data: any): Observable<any> {
        return this.httpClient.post(this.url + "/registrar", data);
    }

    public findAll(): Observable<any> {
        return this.httpClient.get(this.url + "/listar");
    }
}