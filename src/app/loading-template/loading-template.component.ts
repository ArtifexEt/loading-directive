import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export type Position =  
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'left'
  | 'right'
  | 'center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center' 
  | undefined;

  export interface ComponentConfig {
    color?: ThemePalette;
    diameter?: number | undefined;
    position?: Position;
  }

@Component({
  selector: 'app-loading-template',
  templateUrl: './loading-template.component.html',
  styleUrls: ['./loading-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingTemplateComponent {
  public color: ThemePalette;
  public diameter: number = 50;
  public position: Position = 'center';

  constructor() { }

  configure(config?: ComponentConfig) {
    if(config?.color) {
      this.color = config.color;
    }

    if(config?.diameter) {
      this.diameter = config.diameter;
    }

    if(config?.position) {
      this.position = config.position;
    }
  }
}
