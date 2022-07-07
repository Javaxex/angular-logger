import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, timer } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { LoggerConfig, LoggerConfigToken } from './logger.module';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  queue: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);


  constructor(
    @Inject(LoggerConfigToken) private config: LoggerConfig
  ) {
  }

  logError(message: string, timeStamp: number) {
    let stackTrace = (new Error().stack)?.toString();

    let logMessage = this.config.messageFormat.replace("{message}", message);
    logMessage = logMessage.replace("{timeStamp}", timeStamp.toString());
    logMessage = logMessage.replace("{stackTrace}", stackTrace || '');

    if (this.config.useQueue) {
      let prevValue = this.queue.value;
      this.queue.next([...prevValue, logMessage])
    } else {
      this.logArray([logMessage]);
    }

  }

  init() {
    if (this.config.useQueue) {
      return this.queue.pipe(delay(this.config.queueDelay || 0), tap((messages)=> {
        this.logArray(messages);
        this.queue.next([]);
      }))
    }
    return of();
  }

  private logArray(messages: string[]) {
    switch (this.config.target) {
      case 'console':
        writeErrorInConsole(messages);
        break;
      case 'localStorage':
        writeErrorInLocalStorage(messages);
        break;

      default:
        break;
    }
  }

}

function writeErrorInConsole(messages: string[]) {
  messages.forEach(message => {
    console.error(message);
  });
}

function writeErrorInLocalStorage(messages: string[]) {
  const res = localStorage.getItem("LOG_DATA");
  let newData = messages;
  if (res) {
    newData = [...JSON.parse(res), ...newData]
  }

  localStorage.setItem("LOG_DATA", JSON.stringify(newData));
}
