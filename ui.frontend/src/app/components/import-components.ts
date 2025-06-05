import {LazyMapTo, MapTo} from '../core/component-mapping';
import {AemContainerComponent} from '../core/aem-container/aem-container.component';
import {AemResponsivegridComponent} from '../core/aem-responsivegrid/aem-responsivegrid.component';


// import {TitleV2Component, TitleV2IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/title/v2';
// import {BreadCrumbV2Component, BreadCrumbV2IsEmptyFn} from '@adobe/aem-core-components-angular-base/layout/breadcrumb/v2';
// import {NavigationV1Component, NavigationV1IsEmptyFn} from '@adobe/aem-core-components-angular-base/layout/navigation/v1';
// import {ButtonV1Component, ButtonV1IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/button/v1';
// import {ImageV2Component, ImageV2IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/image/v2';
//
// import {DownloadV1Component, DownloadV1IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/download/v1';
//
// import {ListV2Component, ListV2IsEmptyFn} from '@adobe/aem-core-components-angular-base/authoring/list/v2';
// import {SeparatorV1Component} from '@adobe/aem-core-components-angular-base/authoring/separator/v1';
// import {AccordionV1Component} from '@adobe/aem-core-components-angular-spa/containers/accordion/v1';
// import {TabsV1Component} from '@adobe/aem-core-components-angular-spa/containers/tabs/v1';
//
// import {LanguageNavigationV1Component} from '@adobe/aem-core-components-angular-base/layout/language-navigation/v1';
// import {ContainerV1Component} from '@adobe/aem-core-components-angular-spa/containers/container/v1';
// import {ContainerIsEmptyFn} from '@adobe/aem-core-components-angular-spa/core';


// /**
//  * Normal MapTo - maps angular components to aem models
//  */
// MapTo('mysite/components/navigation')(NavigationV1Component, {isEmpty: NavigationV1IsEmptyFn});
// MapTo('mysite/components/separator')(SeparatorV1Component);
//
// MapTo('mysite/components/container')(ContainerV1Component, {isEmpty: ContainerIsEmptyFn});
// MapTo('mysite/components/experiencefragment')(ContainerV1Component, {isEmpty: ContainerIsEmptyFn});
//
// MapTo('mysite/components/download')(DownloadV1Component,{isEmpty: DownloadV1IsEmptyFn});
// MapTo('mysite/components/languagenavigation')(LanguageNavigationV1Component);
// MapTo('mysite/components/list')(ListV2Component, {isEmpty: ListV2IsEmptyFn});
// MapTo('mysite/components/breadcrumb')(BreadCrumbV2Component, {isEmpty: BreadCrumbV2IsEmptyFn});
// MapTo('mysite/components/button')(ButtonV1Component, {isEmpty: ButtonV1IsEmptyFn});
// MapTo('mysite/components/image')(ImageV2Component, {isEmpty: ImageV2IsEmptyFn});
// MapTo('mysite/components/title')(TitleV2Component, {isEmpty: TitleV2IsEmptyFn});
//
// MapTo('mysite/components/accordion')(AccordionV1Component);
// MapTo('mysite/components/tabs')(TabsV1Component);

// /**
//  * Demonstrating lazy loading external modules and components.
//  * Loading the following components with LazyMapTo - so they are loaded only when we need them!
//  */
//
// const TeaserV1Component = () => import('@adobe/aem-core-components-angular-base/authoring/teaser/v1').then(
//   Module => Module.TeaserV1Component
// );
// LazyMapTo('mysite/components/teaser')(TeaserV1Component);
//
// const CarouselV1Component = () => import('@adobe/aem-core-components-angular-spa/containers/carousel/v1').then(
//   Module => Module.CarouselV1Component
// );
// LazyMapTo('mysite/components/carousel')(CarouselV1Component);


const TextEditConfig = {
  emptyLabel: 'Text is empty',
  isEmpty: (cqModel: any) : boolean =>
    !cqModel() || !cqModel().text || cqModel().text.trim().length < 1
};

const LazyTextModule = () => import('./text/text.component').then(
  Module => Module.TextComponent
);

LazyMapTo('mysite/components/text')(LazyTextModule, TextEditConfig);

// MapTo('mysite/components/text')(TextComponent, TextEditConfig);


MapTo('mysite/components/spa')(AemContainerComponent);

// MapTo('mysite/components/experiencefragment')(AemContainerComponent);

MapTo('wcm/foundation/components/responsivegrid')(AemResponsivegridComponent);
