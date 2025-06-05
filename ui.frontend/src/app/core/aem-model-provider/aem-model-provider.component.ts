import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  signal,
  Signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import {Model, ModelManager, PathUtils} from '@adobe/aem-spa-page-model-manager';
import {Utils} from '../utils';
import {Constants} from '../constants';
import {AemDirectiveComponent} from '../aem-component/aem-component.directive';

@Component({
  selector: 'aem-model-provider,[aemModelProvider]',
  imports: [
    AemDirectiveComponent
  ],
  templateUrl: './aem-model-provider.component.html',
  styleUrl: './aem-model-provider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AemModelProviderComponent implements OnInit, OnDestroy{

  cqPath = model<string>();

  cqItem = model<Model>();

  itemName = input('');

  pagePath = input('');

  itemPath = input('');

  updateDataPath = output<any>();

  aemComponent: Signal<AemDirectiveComponent | undefined> = viewChild(AemDirectiveComponent)

  cqItemLoaded: WritableSignal<boolean> = signal(false);

  /**
   * Updates the item data
   */
  updateItem(): void {
    ModelManager.getData({ path: this.cqPath() }).then(model => {
      this.cqItemLoaded.set(true);
      this.cqItem.set(model);
      if (this.pagePath() && Utils.isInEditor()) {
        PathUtils.dispatchGlobalCustomEvent(Constants.ASYNC_CONTENT_LOADED_EVENT, {});
      }
      if (this.aemComponent()) {
        this.aemComponent()?.changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit() {
    // await ModelManager.initialize();
    if (!this.cqItem() && this.pagePath()) {
      this.cqPath.set(Utils.getCQPath(this.pagePath(), this.itemPath()));
      this.updateDataPath.emit({ cqPath: this.cqPath() });
      this.updateItem();
    } else {
      this.cqItemLoaded.set(true);
    }
    ModelManager.addListener(this.cqPath()!, this.updateItem.bind(this));
  }

  ngOnDestroy(): void {
    ModelManager.removeListener(this.cqPath()!, this.updateItem.bind(this));
  }
}
