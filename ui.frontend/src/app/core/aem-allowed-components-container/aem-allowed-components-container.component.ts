import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {AemContainerComponent} from '../aem-container/aem-container.component';
import {AemAllowedComponentsContainerComponentProperties, AllowedComponents} from '../interface';
import {Constants} from '../constants';

@Component({
  selector: 'aem-allowed-components-container',
  imports: [],
  templateUrl: './aem-allowed-components-container.component.html',
  styleUrl: './aem-allowed-components-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AemAllowedComponentsContainerComponent extends AemContainerComponent implements AemAllowedComponentsContainerComponentProperties {
  title = input('');

  emptyLabel = input('No allowed components');

  allowedComponents = input<AllowedComponents>({
    applicable: false,
    components: [],
  })

  allowedComponentListLabel = computed(() => {
    return this.allowedComponents() && this.allowedComponents().components && this.allowedComponents().components.length > 0 ? this.title() : this.emptyLabel();
  })

  allowedComponentss = computed(() => this.allowedComponents().components || [])

  allowedComponentListTitleClassNames = 'aem-AllowedComponent--title';

  allowedComponentClassNames = 'aem-AllowedComponent--component cq-placeholder placeholder';

  isAllowedComponentsApplicable(): boolean {
    return this.isInEditMode() && this.allowedComponents() && this.allowedComponents().applicable;
  }

  getAllowedComponentListPlaceholderClassNames(): string {
    return this.placeHolderClassName + ' ' + Constants.ALLOWED_PLACEHOLDER_CLASS_NAMES;
  }

}
