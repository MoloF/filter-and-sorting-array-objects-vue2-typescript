import { Component } from 'vue'
import { AbstractFilterItem } from './AbstractFilterItem'

export interface IAbstractFilterContainer {
  component: Component;

  addFilterItem (filterItems: AbstractFilterItem[]): void;
  getFilterItems (): AbstractFilterItem[];
}

export abstract class AbstractFilterContainer implements IAbstractFilterContainer {
    abstract component: Component;

    private filterItems: AbstractFilterItem[] = []

    addFilterItem (filterItems: AbstractFilterItem[]): void {
      this.filterItems.push(...filterItems)
    }

    getFilterItems (): AbstractFilterItem[] {
      return this.filterItems
    }
}
