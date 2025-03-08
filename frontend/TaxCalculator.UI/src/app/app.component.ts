import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Required for <router-outlet>
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent { }