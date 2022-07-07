import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private loggerService: LoggerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                if (error.error instanceof ErrorEvent) {
                    errorMsg = `Error: ${error.error.message}`;
                } else {
                    errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                }

                this.loggerService.logError(errorMsg, Date.now());

                return throwError(errorMsg);
            })
        )
}
}
