<template>
  <nav class="filter-nav">
    <button
      @click="updateFilter('completed')"
      :class="{ active: props.current === 'completed'}"
      >completed
    </button>
    <button
      @click="updateFilter('ongoing')"
      :class="{ active: props.current === 'ongoing'}"
      >ongoing
    </button>
    <button
      @click="updateFilter('all')"
      :class="{ active: props.current === 'all'}"
      >all
  </button>
  </nav>
</template>

<script setup lang="ts">
const emit = defineEmits(['filterChanged'])
const props = defineProps(['current'])
const updateFilter = (criteria: string) => {
  emit('filterChanged', criteria)
  console.log(criteria)
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
