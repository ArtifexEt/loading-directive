import { LoadingTemplateComponent, ComponentConfig } from './loading-template/loading-template.component';
import { Directive, Input } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective {
  private isLoading: boolean = false;
  private customTemplate!: TemplateRef<any>;
  private templateConfig?: ComponentConfig;
  
  @Input()
  set appLoading(value: boolean) {
    this.isLoading = value;
    this.render();
  }

  @Input() 
  set appLoadingTemplate(value:  TemplateRef<any>) {
    this.customTemplate = value;
    this.render();
  }

  @Input() 
  set appLoadingConfig(value:  any) {
    this.templateConfig = value;
    this.render();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
		private templateRef: TemplateRef<void>,
    private componentFactoryResolver: ComponentFactoryResolver
    ) { 

  }

  private render(): void {
    console.log('render', this.templateConfig);

    this.viewContainerRef.clear();
    if(this.viewContainerRef.length) {
      this.viewContainerRef.remove();
    }

    if(this.isLoading) {
     
      if (this.customTemplate) {
        this.viewContainerRef.createEmbeddedView(this.customTemplate);
      } else {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingTemplateComponent);
        const component = this.viewContainerRef.createComponent(componentFactory);
        component.instance.configure(this.templateConfig);
       
       
      }

    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
