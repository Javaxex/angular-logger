import { APP_INITIALIZER, FactoryProvider } from "@angular/core";
import { LoggerService } from "./logger.service";

function loggerConfigFactory(configService: LoggerService) {
  // Easy as pie 🥧
  return () => configService.init().subscribe(); // 👈
}

export const loggerInitializeProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loggerConfigFactory,
  deps: [LoggerService],
  multi: true
};
