<template>
  <select @change="onChangeSelectOption">
    <option
        v-for="(sortItemName, index) in selectOptions"
        :key="index"
        :value="index"
        v-text="sortItemName.data.name"
    />
  </select>
</template>

<script lang="ts">
import { IAbstractSortContainer } from '@/core/ListViewer/sorting/AbstractSortContainer'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DefaultSortContainerComponent extends Vue {
    @Prop({ required: true })
      container!: IAbstractSortContainer

    get selectOptions () {
      return this.container.getSortItems()
    }

    onChangeSelectOption (event: Event) {
      const target = event.target as HTMLSelectElement
      this.container.selectSortItem(parseInt(target.value))
    }
}
</script>
