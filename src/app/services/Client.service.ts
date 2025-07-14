import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private httpClient: HttpClient = inject(HttpClient);

    private url: string = 'http://localhost:8080/admin/clientes';

    public save(data: any): Observable<any> {
        return this.httpClient.post(this.url + "/crear", data);
    }

    public findByRuc(ruc: string) : Observable<any> {
        return this.httpClient.get(this.url +"/findByRuc/" + ruc);
    }

    
}