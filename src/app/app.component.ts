import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Position } from './loading-template/loading-template.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading: boolean = true;
  size: number = 70;
  theme: ThemePalette;
  position: Position;


  sample1 = `<div *appLoading="true">Some data</div>`;
  sample2 = `<div *appLoading="true; config: {color: 'warn'}">Some data</div>`;
  sample3 = `<div *appLoading="true; template: template">Some data</div>
<ng-template #template>Loading Template</ng-template>`

}
