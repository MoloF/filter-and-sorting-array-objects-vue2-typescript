import { AbstractFilterItem } from '../AbstractFilterItem'
import StringFilterItemComponent from '@/components/filters/items/StringFilterItemComponent.vue'

export class StringFilterItem extends AbstractFilterItem {
  component = StringFilterItemComponent;

  currentValue = ''

  handler (a: string) {
    if (this.currentValue.length === 0) {
      return true
    }

    return a.toLocaleLowerCase().indexOf(this.currentValue.toLocaleLowerCase()) > -1
  }

  onChange (value: string) {
    this.currentValue = value
  }
}
