import { Component, VERSION as ngVersion } from '@angular/core';
import { VERSION as matVersion } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular NgRx Store';
  ngVersion: string = ngVersion.full;
  matVersion: string = matVersion.full;
  isDarkTheme: boolean = false;
}
