import { AbstractFilterItem, IAbstractFilterItemInput } from '../AbstractFilterItem'
import CheckBoxFilterItemComponent from '@/components/filters/items/CheckBoxFilterItemComponent.vue'

interface IRatingFilterItemInput extends IAbstractFilterItemInput {
  minRating: number;
}

export class RatingFilterItem extends AbstractFilterItem {
  component = CheckBoxFilterItemComponent

  minRating = 0
  currentValue = false

  constructor (data: IRatingFilterItemInput) {
    super(data)

    this.minRating = data.minRating
  }

  handler (a: number): boolean {
    if (!this.currentValue) {
      return true
    }

    return a > this.minRating
  }

  onChange (value: boolean) {
    this.currentValue = value
  }
}
