<template>
  <div class="home">
    <h1>Home</h1>
    <input type="text" v-model="term" placeholder="Type to filter" />
    <div class="home__row">
      <div class="home__col">
        <ItemList :list="filteredList">
          <template #button="{ row, parentId }">
            <button @click="moveElem(row, parentId, 'out')">+</button>
          </template>
        </ItemList>
      </div>

      <div class="home__col">
        <ItemList :list="secondList">
          <template #button="{ row, parentId }">
            <button @click="moveElem(row, parentId, 'in')">-</button>
          </template>
        </ItemList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ItemList from '@/components/ItemList.vue';
import { HistoryModule } from '@/store/modules/history';
import { getList as apiGetList } from '@/api';
import { ListItemInterface } from '@/types';

@Component({
  name: 'Home',
  components: {
    ItemList,
  },
})
export default class extends Vue {
  public term = '';
  public firstList: ListItemInterface[] = [];
  public secondList: ListItemInterface[] = [];

  /**
   * Вернет отфильтрованный список по вхождению поисковой подстроки
   * Не совсем понятно, что делать с родителем, наверное все-таки показывать,
   * ведь в условии написано проверять items.name, а иначе нужно преобразовать
   * список из дерева в плоскую структуру изначально
   */
  get filteredList() {
    return this.firstList
      .map((parent) => ({
        ...parent,
        items: parent.items
          ? parent.items.filter((child) =>
              child.name.toLowerCase().includes(this.term.toLowerCase())
            )
          : [],
      }))
      .filter(
        (parent) =>
          parent.name.toLowerCase().includes(this.term.toLowerCase()) ||
          parent.items.length
      );
  }
  created() {
    this.getList();
  }
  /**
   * Метод запрашивает данные с сервера и кладет в firstList
   * Я сознательно не стал выносить запрос в vuex, т.к. считаю, что именно этот компонент должен распоряжаться этим списком
   * Считаю, что если данные не нужны другим компонентам, то не нужно все подряд тащить в store
   * (при условии, что всегда при заходе в компонент нужно получать актуальный список с сервера)
   * При желании можно легко вынести в store в отдельный модуль
   */
  private getList() {
    apiGetList()
      .then((res) => (this.firstList = res.data))
      .catch((err) => console.log(err));
  }
  /**
   * Метод перемещает элемент из одного списка в другой в зависимости от direction
   * Также дергает метод логирования в историю
   * @param row - объект элемента списка
   * @param parentId - если не null, то фильтруем items родителя, а не список
   * @param direction - направление перемещения. Нужно в т.ч. для логирования в истории
   */
  private moveElem(
    row: ListItemInterface,
    parentId: number,
    direction: string
  ) {
    const from = direction === 'out' ? this.firstList : this.secondList;
    const parent = from.find((el) => el.id === parentId);
    const array = parent ? parent.items || [] : from;
    const index = array.findIndex((el) => el.id === row.id);

    if (index === -1) return;

    const tmp = array.splice(index, 1);
    if (direction === 'out') {
      this.secondList = [...this.secondList, ...tmp];
    } else {
      this.firstList = [...this.firstList, ...tmp];
    }

    HistoryModule.AddLog({
      id: tmp[0].id,
      name: tmp[0].name,
      date: new Date(),
      direction,
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 10px;
  &__row {
    margin: 0 -10px;
    display: flex;
  }
  &__col {
    width: calc(50% - 20px);
    margin: 10px;
  }
}
</style>
