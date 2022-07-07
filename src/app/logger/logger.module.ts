import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { LoggingInterceptor } from "./interceptors/logging-interceptor";
import { LoggerService } from "./logger.service";
import { isDevMode } from '@angular/core';
import { GlobalErrorHandler } from "./interceptors/global-exception-handler";

export interface LoggerConfig {
  target: 'console' | 'localStorage',
  messageFormat: string,
  useQueue: boolean,
  queueDelay?: number
}

export const LoggerConfigToken = new InjectionToken<LoggerConfig>("LoggerConfig");

@NgModule()
export class LoggerModule {

  static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
    if(isDevMode()){
      // ???
    }
    return {
      ngModule: LoggerModule,
      providers: [
        LoggerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoggingInterceptor,
          multi: true
        },
        {
          provide: LoggerConfigToken,
          useValue: config
        },
        {
          provide: ErrorHandler,
          useValue: GlobalErrorHandler
        }
      ]
    }
  }
}
