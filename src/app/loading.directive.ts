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
  set appLoadingConfig(value:  ComponentConfig) {
    this.templateConfig = value;
    this.render();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
		private templateRef: TemplateRef<void>,
    private componentFactoryResolver: ComponentFactoryResolver
    ) {}

  private render(): void {
    this.clean();

    if(this.isLoading) {
      if (this.customTemplate) {
        this.renderLoadingTemplate();
      } else {
        this.renderDefaultLoadingComponent();
      }
    } else {
      this.renderContentState();
    }
  }

  private renderDefaultLoadingComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingTemplateComponent);
    const component = this.viewContainerRef.createComponent(componentFactory);
    component.instance.configure(this.templateConfig);
  }

  private renderContentState(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private renderLoadingTemplate(): void {
    this.viewContainerRef.createEmbeddedView(this.customTemplate);
  }

  private clean(): void {
    this.viewContainerRef.clear();
    if(this.viewContainerRef.length) {
      this.viewContainerRef.remove();
    }
  }
}
