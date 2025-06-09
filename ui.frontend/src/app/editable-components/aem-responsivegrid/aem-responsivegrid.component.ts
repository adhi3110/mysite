import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AemAllowedComponentsContainerComponent } from '@editable-components/aem-allowed-components-container';
import { AemModelProviderComponent } from '@editable-components/aem-model-provider';
import { Constants } from '../constants';
import { Model } from '@adobe/aem-spa-page-model-manager';

@Component({
  selector: 'aem-responsivegrid',
  imports: [AemModelProviderComponent],
  templateUrl: './aem-responsivegrid.component.html',
  styleUrl: './aem-responsivegrid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AemResponsivegridComponent extends AemAllowedComponentsContainerComponent {
  cqType = input<string>('');

  gridClassNames = input<string>('');

  columnClassNames = input<Record<string, string>>({});

  columnCount = input<number>(0);

  /**
   * Returns the column class names for a given column
   * @param itemKey - The key of the column item
   */
  getColumnClassNames(itemKey: string): string {
    return this.columnClassNames() && this.columnClassNames()[itemKey];
  }

  /**
   * Returns the placeholder classes
   */
  getPlaceholderClassNames(): string {
    return this.placeHolderClassName + ' ' + 'aem-Grid-newComponent';
  }

  /**
   * Returns the class names of the responsive grid based on the data from the cqModel
   */
  getHostClassNames(): string {
    let classNames = 'aem-container';

    if (this.classNames()) {
      classNames += ' ' + (this.classNames() || '');
    }

    return classNames + ' ' + this.gridClassNames();
  }

  /**
   * Returns the aggregated path of this container path and the provided path
   *
   * @param path - the provided path to aggregate with the container path
   */
  getAttrDataPath(path: string): string | null {
    const item: Model = this.getItem(path);

    if (
      item &&
      item[Constants.TYPE_PROP as keyof Model] ===
        'wcm/foundation/components/responsivegrid'
    ) {
      // We don't want to add the path for the wrapper for a reponsivegrid
      // The reponsivegrid adds the path on it's own
      return null;
    }

    return this.getDataPath(path);
  }
}
