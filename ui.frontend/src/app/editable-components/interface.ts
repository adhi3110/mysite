import {InputSignal} from '@angular/core';
import {ComponentMapping} from './component-mapping';
import {Model} from '@adobe/aem-spa-page-model-manager';

/**
 * Indicated whether force reload is turned on, forcing the model to be refetched on every MapTo instantiation.
 */
export interface ReloadForceAble {
  cqForceReload?: boolean;
}

/**
 * MappedComponentProperties
 * Properties given to every component runtime by the SPA editor.
 */
export interface MappedComponentProperties extends ReloadForceAble {
  /**
   * Path to the model associated with the current instance of the component
   */
  cqPath: string;

  /**
   * Angular item name
   */
  itemName: string;
}

/**
 * MappedComponentProperties
 * Properties given to every component runtime by the SPA editor.
 */
export interface MappedComponentPropertiesSignal extends ReloadForceAble {
  /**
   * Path to the model associated with the current instance of the component
   */
  cqPath: InputSignal<string>;

  /**
   * Angular item name
   */
  itemName: InputSignal<string>;
}

/**
 * EditConfiguration for a MappedComponent
 * @type <P> Type  of the MappedComponent, used in isEmpty
 */
export interface EditConfig<P extends MappedComponentProperties = any> {
  /**
   * Label to display if the component is considered empty in author mode
   */
  emptyLabel?: string;

  /**
   * Return whether the component should be considered 'empty'.
   * If empty, the component will not be rendered. In author mode, the empty label will be displayed.
   * @param props
   @type <P> Type of the MappedComponent
   */
  isEmpty(props: P): boolean;
}

/**
 * EditConfiguration for a MappedComponent
 * @type <P> Type  of the MappedComponent, used in isEmpty
 */
export interface EditConfigSignal<P extends MappedComponentPropertiesSignal = any> {
  /**
   * Label to display if the component is considered empty in author mode
   */
  emptyLabel?: string;

  /**
   * Return whether the component should be considered 'empty'.
   * If empty, the component will not be rendered. In author mode, the empty label will be displayed.
   * @param props
   @type <P> Type of the MappedComponent
   */
  isEmpty(props: P): boolean;
}

/**
 * Properties corresponding to the AEMContainerComponent
 */
export interface AEMContainerComponentProperties extends MappedComponentProperties {
  componentMapping?: typeof ComponentMapping;
  /**
   * Map of model items included in the current container
   */
  cqItems: Record<string, Model>
  /**
   * Array of model item keys
   */
  cqItemsOrder: string[];
  /**
   * Class names of the current component
   */
  classNames: string;
}


/**
 * Properties corresponding to the AEMContainerComponent
 */
export interface AEMContainerComponentPropertiesSignal extends MappedComponentPropertiesSignal {
  componentMapping?: typeof ComponentMapping;
  /**
   * Map of model items included in the current container
   */
  cqItems: InputSignal<Record<string, Model>>;
  /**
   * Array of model item keys
   */
  cqItemsOrder: InputSignal<string[]>;
  /**
   * Class names of the current component
   */
  classNames: InputSignal<string>;
}

/**
 * Component that is allowed to be used on the page by the editor
 */
export interface AllowedComponent {
  /**
   * Path to the component under apps
   */
  path: string;

  /**
   * Title of the component
   */
  title: string;
}

/**
 * AllowedComponents collection
 */
export interface AllowedComponents {
  applicable: boolean;

  /**
   * List of allowed components
   */
  components: AllowedComponent[];
}

/**
 * Properties for the allowed components container
 */
export interface AemAllowedComponentsContainerComponentProperties extends AEMContainerComponentPropertiesSignal {
  /**
   * List of allowed components for the container
   */
  allowedComponents: InputSignal<AllowedComponents>;

  /**
   *  Label to display when there are no allowed components
   */
  _allowedComponentPlaceholderListEmptyLabel?: string;

  /**
   * Title of the placeholder list
   */
  title: InputSignal<string>;
}

