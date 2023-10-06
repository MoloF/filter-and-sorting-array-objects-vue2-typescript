import { AbstractFilterItem, IAbstractFilterItemInput } from '../AbstractFilterItem'
import RangeFilterItemComponent from '@/components/filters/items/RangeFilterItemComponent.vue'

interface IRangeFilterItemInput extends IAbstractFilterItemInput {
  min: number;
  max: number;
}

export class RangeFilterItem extends AbstractFilterItem {
  component = RangeFilterItemComponent

  minRange!: number
  maxRange!: number

  currentValue = 0

  constructor (data: IRangeFilterItemInput) {
    super(data)

    this.minRange = data.min
    this.maxRange = data.max

    this.currentValue = this.minRange
  }

  handler (a: number): boolean {
    if (this.currentValue <= this.minRange) {
      return true
    }

    return a >= this.currentValue
  }

  onChange (value: number) {
    this.currentValue = value
  }
}
