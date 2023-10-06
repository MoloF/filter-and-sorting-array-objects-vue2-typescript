import { Component } from 'vue'
import { AbstractSortItem } from './AbstractSortItem'

export interface IAbstractSortContainer {
  component: Component;

  addSortItem (sortItems: AbstractSortItem[]): void;
  selectSortItem (itemIndex: number): void;
  getSortItems (): AbstractSortItem[];
  getSortItem (): AbstractSortItem | undefined;
}

export abstract class AbstractSortContainer implements IAbstractSortContainer {
  abstract component: Component;

  private sortItems: AbstractSortItem[] = []
  private selectedSortItemIndex = 0

  private getSortItemByIndex (itemIndex: number): AbstractSortItem | undefined {
    return this.sortItems[itemIndex]
  }

  addSortItem (sortItems: AbstractSortItem[]): void {
    this.sortItems.push(...sortItems)
  }

  selectSortItem (itemIndex: number): void {
    this.selectedSortItemIndex = itemIndex
  }

  getSortItems (): AbstractSortItem[] {
    return this.sortItems
  }

  getSortItem (): AbstractSortItem | undefined {
    return this.getSortItemByIndex(this.selectedSortItemIndex)
  }
}
