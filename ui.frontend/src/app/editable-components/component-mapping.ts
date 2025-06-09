/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { ComponentMapping as SPAComponentMapping } from '@adobe/aem-spa-component-mapping';
import { Directive, input, Type } from '@angular/core';
import { EditConfigSignal, MappedComponentPropertiesSignal } from './interface';
import { Utils } from './utils';

/**
 * Provides standard implementation for the MappedComponentProperties using @Input
 */
@Directive()
export abstract class AbstractMappedComponentDirectiveSignal
  implements MappedComponentPropertiesSignal
{
  isInEditor = input(Utils.isInEditor());

  cqPath = input('');

  itemName = input('');
}

/**
 * The current class extends the @adobe/cq-spa-component-mapping#Mapto library and features with Angular specifics such as
 *
 * - Storing the editing configurations for each resource type
 */
export class ComponentMappingWithConfig {
  /**
   * Store of EditConfig structures
   */
  private editConfigMap: Record<
    string,
    EditConfigSignal<MappedComponentPropertiesSignal>
  > = {};

  constructor(private spaMapping: SPAComponentMapping) {}

  /**
   * Stores a component class for the given resource types and also allows to provide an EditConfig object
   * @param resourceTypes - List of resource types
   * @param clazz - Component class to be stored
   * @param [editConfig] - Edit configuration to be stored for the given resource types
   * @type Model - The Model interface / class type bound to the editconfig object.
   */
  map<Model extends MappedComponentPropertiesSignal = any>(
    resourceTypes: string | string[],
    clazz: Type<Model>,
    editConfig: EditConfigSignal<Model> | null = null,
  ): void {
    const innerClass = clazz;

    const resourceList =
      typeof resourceTypes === 'string' ? [resourceTypes] : resourceTypes;

    resourceList.forEach((entry) => {
      if (editConfig) {
        this.editConfigMap[entry] = editConfig;
      }
      this.spaMapping.map(entry, innerClass);
    });
  }

  /**
   * Stores a  component class for the given resource types and also allows to provide an EditConfig object in a Lazy Manner
   * @param resourceTypes - List of resource types
   * @param lazyClassFunction - A function that returns a promise to give back the designated type / class
   * @param [editConfig] - Edit configuration to be stored for the given resource types
   * @type Model - The Model interface / class type bound to the editconfig object.
   */
  lazyMap<Model extends MappedComponentPropertiesSignal = any>(
    resourceTypes: string | string[],
    lazyClassFunction: () => Promise<Type<Model>>,
    editConfig: EditConfigSignal<Model> | null = null,
  ) {
    const innerFunction = lazyClassFunction;

    const resourceList =
      typeof resourceTypes === 'string' ? [resourceTypes] : resourceTypes;

    resourceList.forEach((entry) => {
      if (editConfig) {
        this.editConfigMap[entry] = editConfig;
      }
      this.spaMapping.lazyMap(entry, innerFunction);
    });
  }

  /**
   * Returns the component class for the given resourceType
   * @param resourceType - Resource type for which the component class has been stored
   * @type Model - The Model interface / class type bound to the editconfig object.
   */
  get<Model extends MappedComponentPropertiesSignal = any>(
    resourceType: string,
  ): Type<Model> {
    return this.spaMapping.get(resourceType) as Type<Model>;
  }

  /**
   * Returns the component class Promise for the given resourceType
   * @param resourceType - Resource type for which the component class has been stored
   * @type Model - The Model interface / class type bound to the editconfig object.
   */
  lazyGet<Model extends MappedComponentPropertiesSignal = any>(
    resourceType: string,
  ): Promise<Type<Model>> {
    return this.spaMapping.getLazy(resourceType) as Promise<Type<Model>>;
  }

  /**
   * Returns the EditConfig structure for the given type
   * @param resourceType - Resource type for which the configuration has been stored
   * @type Model - The Model interface / class type bound to the editconfig object.
   */
  getEditConfig<Model extends MappedComponentPropertiesSignal = any>(
    resourceType: string,
  ): EditConfigSignal<Model> {
    return this.editConfigMap[resourceType];
  }
}

const componentMapping = new ComponentMappingWithConfig(SPAComponentMapping);

/**
 * Stores a component class for the given resource types and also allows to provide an EditConfig object
 * @param resourceTypes - List of resource types
 * @type Model - The Model interface / class type that will be Mapped. Bound to the EditConfig configuration.
 */
function MapTo<Model extends MappedComponentPropertiesSignal = any>(
  resourceTypes: string | string[],
) {
  /**
   * @param clazz - Component class to be stored
   * @param [editConfig] - Edit configuration to be stored for the given resource types
   */
  return (
    clazz: Type<Model>,
    editConfig: EditConfigSignal<Model> | null = null,
  ): void => componentMapping.map(resourceTypes, clazz, editConfig);
}

/**
 * Stores a clazz the lazy way for dynamic imports / code splitting.function that returns a promise
 * @param resourceTypes - List of resource types
 * @type Model - The Model interface / class type that will be Mapped. Bound to the EditConfig configuration.
 */
function LazyMapTo<Model extends MappedComponentPropertiesSignal = any>(
  resourceTypes: string | string[],
) {
  /**
   * @param lazyClassPromise - Function that returns a promise resolving a class
   * @param [editConfig] - Edit configuration to be stored for the given resource types
   */
  return (
    lazyClassFunction: () => Promise<Type<Model>>,
    editConfig: EditConfigSignal<Model> | null = null,
  ): void =>
    componentMapping.lazyMap(resourceTypes, lazyClassFunction, editConfig);
}

export { componentMapping as ComponentMapping, MapTo, LazyMapTo };
