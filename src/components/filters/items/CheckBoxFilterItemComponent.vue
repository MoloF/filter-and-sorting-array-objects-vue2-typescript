<template>
  <div>
    {{ filter.data.name }} (от {{ filter.minRating }})
    <input type="checkbox" @change="onChange">
  </div>
</template>

<script lang="ts">
import { RatingFilterItem } from '@/core/ListViewer/filters/items/RatingFilterItem'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CheckBoxFilterItemComponent extends Vue {
  @Prop({ required: true })
  filter!: RatingFilterItem

  onChange (event: Event) {
    const target = event.target as HTMLInputElement
    this.filter.onChange(target.checked)
  }
}
</script>
