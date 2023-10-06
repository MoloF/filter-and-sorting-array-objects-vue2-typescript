# Фильтрация и сортировка списка обьектов

### Реализовано с помощью абстракций, логика фильтрации и сортировки разделена на разные классы и легко масштабируется. Фильтрация и сортировка работает в одновременном режиме, сначала выполняется фильтрация массива и только потом сортировка.

---

#### Функции:

- Создание и кастомизация отдельных компонентов для сортировки, фильтрации.
- Увеличение количества вариаций фильтров и сортировки без необходимости изменять родительские классы.
-  Легкое добавление и изменение необходимых фильтров и сортировок.

---

#### Примеры создания:

Создание кастомного контейнера сортировки, необходимо создать компонент и наследоваться от абcтрактного класса `AbstractSortContainer`

```ts
import DefaultSortContainerComponent from '@/components/sorting/containers/DefaultSortContainerComponent.vue'
import { AbstractSortContainer } from '../AbstractSortContainer'

export class DefaultSortContainer extends AbstractSortContainer {
  component = DefaultSortContainerComponent
}
```

Для создания кастомной логики сортировки необходимо создать класс и реализовать обработчик сортировки, наследуйтесь от абстрактного класса `AbstractSortItem`

```ts
import { AbstractSortItem } from '../AbstractSortItem'

export class NumberSortItem extends AbstractSortItem {
  handler (a: number, b: number): number {
    return a - b
  }
}
```

---

Создание кастомного контейнера фильтрации, необходимо создать компонент и наследоваться от абcтрактного класса `AbstractFilterContainer`

```ts
import DefaultFilterContainerComponent from '@/components/filters/containers/DefaultFilterContainerComponent.vue'
import { AbstractFilterContainer } from '../AbstractFilterContainer'

export class DefaultFilterContainer extends AbstractFilterContainer {
  component = DefaultFilterContainerComponent
}
```

Для создания кастомной логики фильтрации необходимо создать класс и реализовать обработчик и callback функцию для пробрасывания текущего значения инпута, наследуйтесь от абстрактного класса `AbstractFilterItem`

```ts
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
```

---

#### Примеры использования

```ts
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

    const firstFilterContainer = new DefaultFilterContainer()

    firstSortContainer.addSortItem([
      new DefaultSortItem({
        name: 'Нет'
      }),
      new NumberSortItem({
        name: 'Цена',
        key: 'price'
      })
    ])

    firstFilterContainer.addFilterItem([
      new StringFilterItem({
        name: 'Название',
        key: 'name'
      })
    ])

    this.listViewer.addSortContainer(firstSortContainer)

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
```