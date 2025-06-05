import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {AbstractMappedComponentDirectiveSignal} from '../component-mapping';
import {AEMContainerComponentPropertiesSignal} from '../interface';
import {Model} from '@adobe/aem-spa-page-model-manager';
import {Utils} from '../utils';
import {Constants} from '../constants';
import {AemModelProviderComponent} from '../aem-model-provider/aem-model-provider.component';

@Component({
  selector: 'aem-container',
  imports: [
    AemModelProviderComponent
  ],
  templateUrl: './aem-container.component.html',
  styleUrl: './aem-container.component.scss',
  host: {
    '[class]': 'hostClasses',
    '[attr.data-cq-data-path]': 'cqPath()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AemContainerComponent extends AbstractMappedComponentDirectiveSignal implements AEMContainerComponentPropertiesSignal {

  cqItems = input.required<{[key: string]: Model}>();

  cqItemsOrder = input.required<string[]>();

  classNames = input<string>('');

  modelName = input();

  placeHolderPath = computed(() => this.cqPath() + '/' + Constants.PLACEHOLDER_ITEM_NAME);

  hostClasses = Constants.CONTAINER_CLASS_NAMES;

  placeHolderClassName = Constants.NEW_SECTION_CLASS_NAMES;

  /**
   * Returns the aggregated path of this container path and the provided path
   *
   * @param path - the provided path to aggregate with the container path
   */
  getDataPath(path: string): string {
    return this.cqPath() ? this.cqPath() + '/' + path : path;
  }

  /**
   * Returns the item data from the cqModel
   *
   * @param itemKey - the itemKey to look for in the items.
   */
  getItem(itemKey: string): Model {
    return this.cqItems() && this.cqItems()[itemKey];
  }

  isInEditMode() {
    return Utils.isInEditor()
  }

}
