import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private httpClient: HttpClient = inject(HttpClient);

    private url: string = 'http://localhost:8080/muestras/solicitud';

    public save(): Observable<any> {
        return this.httpClient.post(this.url + "/crear", null);
    }
}
