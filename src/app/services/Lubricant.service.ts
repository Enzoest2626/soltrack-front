import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LubricantService {

    private httpClient: HttpClient = inject(HttpClient);

    private url: string = 'http://localhost:8080/admin/lubricantes';

    public save(data: any): Observable<any> {
        return this.httpClient.post(this.url + "/crear", data);
    }

    private update(data: any): Observable<any> {
        return this.httpClient.put(this.url, data);
    }
}