<template>
  <div>
    {{ filter.data.name }}
    <input type="text" @input="onInput">
  </div>
</template>

<script lang="ts">
import { IAbstractFilterItem } from '@/core/ListViewer/filters/AbstractFilterItem'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class StringFilterItemComponent extends Vue {
  @Prop({ required: true })
  filter!: IAbstractFilterItem

  onInput (event: Event) {
    const target = event.target as HTMLInputElement
    this.filter.onChange(target.value)
  }
}
</script>
