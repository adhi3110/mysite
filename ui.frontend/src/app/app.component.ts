import {Component, DoCheck} from '@angular/core';
import {ModelManager} from '@adobe/aem-spa-page-model-manager';
import {Constants} from '@editable-components';

import './components/import-components'
import {RouterModule} from '@angular/router';

@Component({
  selector: '#spa-root',
  templateUrl: './app.component.html',
  imports: [
    RouterModule
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements DoCheck {
  items: any;
  itemsOrder: any;
  path: any;

  constructor() {
    ModelManager.initialize().then(this.updateData);
  }
  private updateData = (pageModel: { [x: string]: any; }) => {
    this.path = pageModel[Constants.PATH_PROP];
    this.items = pageModel[Constants.ITEMS_PROP];
    this.itemsOrder = pageModel[Constants.ITEMS_ORDER_PROP];
  }

  ngDoCheck(): void {
    console.count("Change Detection")
  }
}
