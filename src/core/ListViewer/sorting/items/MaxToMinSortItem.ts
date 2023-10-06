import { AbstractSortItem } from '../AbstractSortItem'

export class MaxToMinSortItem extends AbstractSortItem {
  handler (): number {
    return -1
  }
}
