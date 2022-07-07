import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, NgZone } from "@angular/core";
import { LoggerService } from "../logger.service";

export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private loggerService: LoggerService
  ) {}

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    //error?.message
    this.loggerService.logError(error?.message||'', Date.now());
  }
}
