<template>
  <nav class="filter-nav">
    <button
      v-for="filter in Filter"
      :key="filter"
      @click="updateFilter(filter)"
      :class="{ active: props.current === filter }"
    >
      {{ filter }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { Filter } from '@/types/Filter'

const emit = defineEmits<{
  filterChanged: [filter: Filter]
}>()
const props = defineProps<{
  current: Filter
}>()

const updateFilter = (filter: Filter) => {
  emit('filterChanged', filter)
}
</script>

<style>
.filter-nav button {
  background: rgb(107, 107, 107);
  border: none;
  border-radius: 5px;
  color: white;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}
.filter-nav button.active {
  background: rgb(0, 189, 126);
}
</style>
