import { AbstractSortItem } from '../AbstractSortItem'

export class NumberSortItem extends AbstractSortItem {
  handler (a: number, b: number): number {
    return a - b
  }
}
