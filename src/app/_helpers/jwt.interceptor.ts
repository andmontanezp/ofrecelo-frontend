import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from "../_services/loading.service";
import { finalize } from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    activeRequests: number = 0;

    constructor(private authenticationService: AuthenticationService,
                private loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //loading
        let displayLoadingScreen = true;
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.access_token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }

        if (displayLoadingScreen) {
            if (this.activeRequests === 0) {
              this.loadingService.startLoading();
            }
            this.activeRequests++;
      
            return next.handle(request).pipe(
              finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                  this.loadingService.stopLoading();
                }
              })
            )
          } else {
            return next.handle(request);
          }
    }
}