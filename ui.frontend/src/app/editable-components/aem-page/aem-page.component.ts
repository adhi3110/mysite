import { Component } from '@angular/core';
import { Constants } from '../constants';
import {
  AemContainerComponent,
  AemModelProviderComponent,
} from '@editable-components';

@Component({
  selector: 'aem-page',
  host: {
    '[class]': 'hostClasses',
    '[attr.data-cq-data-path]': 'cqPath()',
  },
  templateUrl: '../aem-container/aem-container.component.html',
  imports: [AemModelProviderComponent],
})
/**
 * The current component carries the base presentational logic of page component
 */
export class AEMPageComponent extends AemContainerComponent {
  /**
   * Returns the aggregated path of this container path and the provided path
   *
   * @param path - the provided path to aggregate with the container path
   */
  override getDataPath(path: string): string {
    return this.cqPath()
      ? this.cqPath() + Constants.PAGE_MODEL_SEPARATOR + path
      : path;
  }
}
