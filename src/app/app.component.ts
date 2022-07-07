import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoggerService } from './logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private loggerService: LoggerService, private http: HttpClient) {
  }

  log(){
    const data$ = this.http.get('https://jsoplaceholder.typicode.com/posts');
    data$.subscribe(response => {
      console.log('response', response);
    })
  }
}
