<template>
  <div>
    {{ filter.data.name }} ({{ filter.currentValue.toString().padStart(3, '0') }})
    <input
      type="range"
      :min="filter.minRange"
      :max="filter.maxRange"
      :value="filter.currentValue"
      step="1"
      @input="onChange"
    >
  </div>
</template>

<script lang="ts">
import { RangeFilterItem } from '@/core/ListViewer/filters/items/RangeFilterItem'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CheckBoxFilterItemComponent extends Vue {
  @Prop({ required: true })
    filter!: RangeFilterItem

  onChange (event: Event) {
    const target = event.target as HTMLInputElement
    this.filter.onChange(Number(target.value))
  }
}
</script>
