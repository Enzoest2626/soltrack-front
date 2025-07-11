import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {
        
    }

    public getItem(item: string): string | null {
        return localStorage.getItem("");
    }

    public removeItem(item: string): void {
        localStorage.removeItem(item);
    }

    public setItem(item: string, value: string): void {
        localStorage.setItem(item, value);
    }

    public existItem(item: string): boolean {
        return this.getItem(item) !== null;
    } 
}