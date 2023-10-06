<template>
  <div>
    <div class="nav">
      Сортировка по:
      <component
        v-for="(sortContainer, index) in sortContainers"
        :key="index"
        :is="sortContainer.component"
        :container="sortContainer"
      />
    </div>
    <component
      v-for="(filterContainer, index) in filterContainers"
      :key="index"
      :is="filterContainer.component"
      :container="filterContainer"
    />
    <hr />
    <div class="elements">
      <template v-for="item in preparedItems">
        <div class="item" :key="item.id">
          <strong class="name">Название: {{ item.name }}</strong>
          <div class="price">Цена: {{ item.price }}</div>
          <div class="rating">Рейтинг: {{ item.rating }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ListViewer } from '@/core/ListViewer/ListViewer'
import { DefaultSortContainer } from '@/core/ListViewer/sorting/containers/DefaultSortContainer'
import { DefaultSortItem } from '@/core/ListViewer/sorting/items/DefaultSortItem'
import { NumberSortItem } from '@/core/ListViewer/sorting/items/NumberSortItem'
import { MinToMaxSortItem } from '@/core/ListViewer/sorting/items/MinToMaxSortItem'
import { MaxToMinSortItem } from '@/core/ListViewer/sorting/items/MaxToMinSortItem'
import { DefaultFilterContainer } from '@/core/ListViewer/filters/containers/DefaultFilterContainer'
import { StringFilterItem } from '@/core/ListViewer/filters/items/StringFilterItem'
import { RangeFilterItem } from '@/core/ListViewer/filters/items/RangeFilterItem'
import { RatingFilterItem } from '@/core/ListViewer/filters/items/RatingFilterItem'

interface IItem {
  id: number;
  name: string;
  price: number;
  rating: number;
}

@Component
export default class HomePage extends Vue {
  private items: IItem[] = [
    { id: 1, name: 'First', price: 100, rating: 0.2 },
    { id: 2, name: 'Second', price: 101, rating: 0.5 },
    { id: 3, name: 'Third', price: 101, rating: 0.9 },
    { id: 4, name: 'Forth', price: 50, rating: 0.6 }
  ]

  private listViewer = new ListViewer<IItem>(this.items)

  created () {
    const firstSortContainer = new DefaultSortContainer()
    const secondSortContainer = new DefaultSortContainer()

    const firstFilterContainer = new DefaultFilterContainer()

    firstSortContainer.addSortItem([
      new DefaultSortItem({
        name: 'Нет'
      }),
      new NumberSortItem({
        name: 'Цена',
        key: 'price'
      }),
      new NumberSortItem({
        name: 'Рейтинг',
        key: 'rating'
      })
    ])

    secondSortContainer.addSortItem([
      new MinToMaxSortItem({
        name: 'По возрастанию'
      }),
      new MaxToMinSortItem({
        name: 'По убыванию'
      })
    ])

    const prices = this.items.map(({ price }) => price)

    firstFilterContainer.addFilterItem([
      new StringFilterItem({
        name: 'Название',
        key: 'name'
      }),
      new RangeFilterItem({
        name: 'Цена',
        key: 'price',
        min: Math.min(...prices),
        max: Math.max(...prices)
      }),
      new RatingFilterItem({
        name: 'С высоким рейтингом',
        key: 'rating',
        minRating: 0.75
      })
    ])

    this.listViewer.addSortContainer(firstSortContainer)
    this.listViewer.addSortContainer(secondSortContainer)

    this.listViewer.addFilterContainer(firstFilterContainer)
  }

  get preparedItems (): IItem[] {
    return this.listViewer.getItems()
  }

  get sortContainers () {
    return this.listViewer.getSortContainers()
  }

  get filterContainers () {
    return this.listViewer.getFilterContainers()
  }
}
</script>

<style>
.nav {
  margin: 10px 0;
}
.nav-el {
  margin: 10px;
}
.item {
  margin: 5px 0;
  padding: 5px;
  border: 1px solid #000;
}

select {
  margin: 0 5px;
}
</style>
