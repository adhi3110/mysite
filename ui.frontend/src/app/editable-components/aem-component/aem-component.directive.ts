import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef, computed,
  Directive,
  inject,
  input, model,
  OnChanges,
  OnDestroy,
  OnInit, Renderer2, Signal, Type, ViewContainerRef
} from '@angular/core';
import {EditConfig, MappedComponentPropertiesSignal} from '../interface';
import {Model} from '@adobe/aem-spa-page-model-manager';
import {ComponentMapping} from '../component-mapping';
import {Constants} from '../constants';
import {Utils} from '../utils';

@Directive({
  selector: '[aemComponent]'
})
export class AemDirectiveComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges {

  changeDetectorRef = inject(ChangeDetectorRef)

  viewContainer = inject(ViewContainerRef)

  renderer = inject(Renderer2);

  cqItem = input<Model>();

  cqPath = input<string>();

  itemName = input<string>();

  itemAttrs = input<any>();

  loaded = model<boolean>(false);

  type: Signal<string | undefined> = computed((): string | undefined => {
    return this.cqItem() && this.cqItem()?.[':type']
  });

  private _component: ComponentRef<MappedComponentPropertiesSignal> | undefined;

  async ngOnInit() {
    if (this.type()) {
      const mappedFn: Type<MappedComponentPropertiesSignal> = ComponentMapping.get<MappedComponentPropertiesSignal>(<string>this.type());

      if (mappedFn) {
        this.renderComponent(mappedFn);
      } else {
        await this.initializeAsync();
      }
    } else {
      console.warn('no type on ' + this.cqPath);
    }

  }

  async initializeAsync() {
    const lazyMappedPromise: Promise<Type<MappedComponentPropertiesSignal>> = ComponentMapping.lazyGet<MappedComponentPropertiesSignal>(<string>this.type());

    try {
      const LazyResolvedComponent = await lazyMappedPromise;
      this.renderComponent(LazyResolvedComponent);
      this.loaded.set(true);
      this.changeDetectorRef.detectChanges();
    } catch (err) {
      console.warn(err);
    }
  }

  /**
   * Renders a component dynamically based on the component definition
   *
   * @param componentDefinition The component definition to render
   */
  private renderComponent(componentDefinition: Type<MappedComponentPropertiesSignal>) {
    if (componentDefinition) {
      this.viewContainer.clear();
      this._component = this.viewContainer.createComponent(componentDefinition);
      this.updateComponentData();
    } else {
      throw new Error('No component definition!!');
    }
  }

  /**
   * Updates the data of the component based the data of the directive
   */
  private updateComponentData() {
    if (!this._component || !this._component.instance || !this.cqItem()) {
      return;
    }

    const keys = Object.getOwnPropertyNames(this.cqItem());

    keys.forEach((key) => {
      let propKey = key;

      if (propKey.startsWith(':')) {
        // Transformation of internal properties namespaced with [:] to [cq]
        // :myProperty => cqMyProperty
        const tempKey = propKey.substring(1);

        propKey = 'cq' + tempKey.substring(0, 1).toUpperCase() + tempKey.substring(1);
      }

      // @ts-expect-error - this is a workaround for the fact that the type of the input is already checked
      this._component.setInput(propKey, this.cqItem()[key]);
    });

    this._component.setInput('cqPath' ,this.cqPath());
    // @ts-expect-error - this is a workaround for the fact that the type of the input is already checked
    this._component.setInput('itemName', this.itemName() || (this.cqItem() && this.cqItem().id));
    this.includeAppliedCSSClasses();

    let editConfig;
    if (this.type()) {
      // @ts-expect-error - this is a workaround for the fact that the type of the input is already checked
      editConfig = ComponentMapping.getEditConfig(this.type());
    }

    if (editConfig && Utils.isInEditor()) {
      this.setupPlaceholder(editConfig);
    }

    this.changeDetectorRef.detectChanges();
  }

  /**
   * Determines if the placeholder should e displayed.
   *
   * @param editConfig - the edit config of the directive
   */
  private usePlaceholder(editConfig: EditConfig) {
    return editConfig.isEmpty && typeof editConfig.isEmpty === 'function' && editConfig.isEmpty(this.cqItem);
  }

  /**
   * Setups the placeholder of needed for the AEM editor
   *
   * @param editConfig - the editConfig, which will dictate the classes to be added on.
   */
  private setupPlaceholder(editConfig: EditConfig) {
    if (this.usePlaceholder(editConfig)) {
      this.renderer.addClass(this._component!.location.nativeElement, Constants.PLACEHOLDER_CLASS_NAME);
      this.renderer.setAttribute(this._component!.location.nativeElement, 'data-emptytext', editConfig.emptyLabel || '');
    } else {
      this.renderer.removeClass(this._component!.location.nativeElement, Constants.PLACEHOLDER_CLASS_NAME);
      this.renderer.removeAttribute(this._component!.location.nativeElement, 'data-emptytext');
    }
  }

  /**
   * Adds the applied css class names in to the element
   */
  private includeAppliedCSSClasses() {
    // @ts-expect-error - this is a workaround for the fact that the type of the input is already checked
    const appliedCssClassNames = this.cqItem()[Constants.APPLIED_CLASS_NAMES] || '';

    if (appliedCssClassNames && this._component) {
      this.renderer.setAttribute(this._component.location.nativeElement, 'class', appliedCssClassNames);
    }
  }

  /**
   * Adds the specified item attributes to the element
   */
  private setupItemAttrs() {
    if (this.itemAttrs()) {
      const keys = Object.getOwnPropertyNames(this.itemAttrs());

      keys.forEach((key) => {
        if (key === 'class') {
          const classes = this.itemAttrs()[key].split(' ');

          classes.forEach((itemClass: string) => {
            this.renderer.addClass(this._component!.location.nativeElement, itemClass);
          });
        } else {
          this.renderer.setAttribute(this._component!.location.nativeElement, key, this.itemAttrs()[key]);
        }
      });
    }
  }

  ngOnChanges(): void {
    this.updateComponentData();
  }

  ngAfterViewInit(): void {
    this.setupItemAttrs();
  }

  ngOnDestroy(): void {
    if (this._component) {
      this._component.destroy();
    }
  }


}
