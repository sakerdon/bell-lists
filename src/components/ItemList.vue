<template>
  <div class="list">
    <template v-for="item in list">
      <div :key="item.id" class="list__item">
        {{ item.name }}

        <div class="list__button">
          <slot name="button" :row="item"></slot>
        </div>
      </div>

      <div
        v-for="child in item.items"
        :item="child"
        :key="child.id"
        class="list__item list__item_child"
      >
        {{ child.name }}
        <div class="list__button">
          <slot name="button" :row="child" :parentId="item.id"></slot>
        </div>
      </div>
    </template>
    <div v-if="!list.length" class="list__placeholder">nothing to show</div>
  </div>
</template>

<script lang="ts">
import { ListItemInterface } from '@/types';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'ItemList',
})
export default class extends Vue {
  @Prop({ default: () => [] }) readonly list!: ListItemInterface[];
}
</script>

<style lang="scss">
.list {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__item {
    border-bottom: 1px solid silver;
    padding: 10px;
    display: flex;

    &_child {
      padding-left: 20px;
    }
  }

  &__button {
    margin-left: auto;
  }

  &__placeholder {
    margin: auto;
  }
}
</style>
