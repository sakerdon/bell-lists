<template>
  <div class="history">
    <h1>History</h1>
    <table class="history__list">
      <tbody>
        <tr class="history__header">
          <th>Id</th>
          <th>Date</th>
          <th>Name</th>
          <th>Direction</th>
        </tr>
        <tr
          v-for="log in filteredList"
          :key="log.id + log.date"
          class="history__row"
        >
          <td>{{ log.id }}</td>
          <td>{{ log.date }}</td>
          <td>{{ log.name }}</td>
          <td>{{ log.direction }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { HistoryModule } from '@/store/modules/history';

@Component({
  name: 'History',
})
export default class extends Vue {
  @Prop({ default: '' }) readonly direction!: string;

  get filteredList() {
    if (!this.direction) return HistoryModule.logs;
    return HistoryModule.logs.filter((log) => log.direction === this.direction);
  }

  created() {
    if (this.direction && !/^out$|^in$/i.test(this.direction)) {
      this.$router.replace('/history');
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  &__list {
    border-collapse: collapse;
    text-align: left;

    th,
    td {
      border: 1px solid silver;
      padding: 10px;
    }
  }
}
</style>
