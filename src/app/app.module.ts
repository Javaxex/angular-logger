import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loggerInitializeProvider } from './logger/logger.initializer';
import { LoggerConfig, LoggerModule } from './logger/logger.module';

const config: LoggerConfig = {
  target: 'console',
  useQueue: true,
  queueDelay: 2000,
  messageFormat: "[ERR] {message} AT {timeStamp} \n {stackTrace}"
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LoggerModule.forRoot(config),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [loggerInitializeProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
