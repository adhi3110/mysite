import { Constants } from '../../core/constants';
import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModelManagerService} from '../model-manager.service';
import {AEMPageComponent} from '../../core/aem-page/aem-page.component';

@Component({
  selector: 'app-main',
  imports: [
    AEMPageComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {

  items: WritableSignal<any> = signal(undefined);

  itemsOrder: WritableSignal<any> = signal(undefined);

  path: WritableSignal<any> = signal(undefined);

  route = inject(ActivatedRoute);

  modelManagerService: ModelManagerService = inject(ModelManagerService);

  constructor(){
    this.modelManagerService
      // @ts-ignore
      .getData({ path: this.route.snapshot.data['path'] })
      .then((data: any) => {
        this.path.set(data[Constants.PATH_PROP]);
        this.items.set(data[Constants.ITEMS_PROP]);
        this.itemsOrder.set(data[Constants.ITEMS_ORDER_PROP]);
      });
  }

}
