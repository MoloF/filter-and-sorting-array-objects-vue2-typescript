import { AbstractFilterContainer } from './filters/AbstractFilterContainer'
import { AbstractSortContainer } from './sorting/AbstractSortContainer'

export interface IListViewer<I> {
  addSortContainer (sortContainer: AbstractSortContainer): void
  getSortContainers (): AbstractSortContainer[]
  addFilterContainer (sortContainer: AbstractFilterContainer): void
  getFilterContainers (): AbstractFilterContainer[]
  getItems(): I[];
}

export class ListViewer<I> implements IListViewer<I> {
  constructor (private items: I[]) { }

  private sortingContainers: AbstractSortContainer[] = []
  private filtersContainers: AbstractFilterContainer[] = []

  addSortContainer (sortContainer: AbstractSortContainer) {
    this.sortingContainers.push(sortContainer)
  }

  addFilterContainer (filterContainer: AbstractFilterContainer) {
    this.filtersContainers.push(filterContainer)
  }

  getSortContainers () {
    return this.sortingContainers
  }

  getFilterContainers () {
    return this.filtersContainers
  }

  getItems (): I[] {
    let items: I[] = this.items.concat()

    for (const filterContainer of this.filtersContainers) {
      for (const filterItem of filterContainer.getFilterItems()) {
        const { key } = filterItem.data
        items = items.filter((a: any) => filterItem.handler(a[key] || a))
      }
    }

    for (const sortContainer of this.sortingContainers) {
      const sort = sortContainer.getSortItem()
      if (sort) {
        const key = sort.data.key || ''
        items.sort((a: any, b: any) => sort.handler(a[key] || a, b[key] || b))
      }
    }

    return items
  }
}
