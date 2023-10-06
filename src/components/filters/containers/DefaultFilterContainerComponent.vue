<template>
  <div class="nav">
    Фильтрация по:
    <component
      v-for="(filterItem, index) in filterItems"
      :key="index"
      :is="filterItem.component"
      :filter="filterItem"
    />
  </div>
</template>

<script lang="ts">
import { IAbstractFilterContainer } from '@/core/ListViewer/filters/AbstractFilterContainer'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DefaultFilterContainerComponent extends Vue {
  @Prop({ required: true })
    container!: IAbstractFilterContainer

  get filterItems () {
    return this.container.getFilterItems()
  }
}
</script>
