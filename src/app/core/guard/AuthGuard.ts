import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RedirectCommand, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "../services/LocalStorage.service";



export const authGuard: CanActivateFn = (route, state) => {
    const localStorageService: LocalStorageService = inject(LocalStorageService);
    const router: Router = inject(Router);
    let hasToken: boolean = localStorageService.existItem("token");

    if (!hasToken) {
        const login = router.parseUrl("/login");

        return new RedirectCommand(login, {
            skipLocationChange: true
        });
    }

    return true;
}