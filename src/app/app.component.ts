import { Component, VERSION as ngVersion } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular NgRx Store';
  ngVersion: string = ngVersion.full;
  isDarkTheme: boolean = false;
}
