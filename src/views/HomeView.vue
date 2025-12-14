<script setup lang="ts">
import SingleProject from '@/components/SingleProject.vue'
import { computed, onMounted, ref, watch } from 'vue'
import type { Project } from '@/types/Project'
import FilterNav from '@/components/FilterNav.vue'
import { useUrlSearchParams } from '@vueuse/core'
import { Filter, isValidFilter } from '@/types/Filter'
import { useRouter } from 'vue-router'

const params = useUrlSearchParams('history')
const router = useRouter()

const projects = ref<Project[]>([])
const filterCriteria = computed(() => {
  const filter = params.filter as string
  if (!filter) return Filter.All
  return isValidFilter(filter) ? filter : null
})

// Redirect to 404 if invalid filter
watch(filterCriteria, (value) => {
  if (value === null) {
    router.replace({ name: 'NotFound' })
  }
}, { immediate: true })

const handleFilterChange = (filter: Filter) => {
  params.filter = filter
}

const filteredProjects = computed(() => {
  switch (filterCriteria.value) {
    case Filter.Completed:
      return projects.value.filter((project) => project.complete)
    case Filter.Ongoing:
      return projects.value.filter((project) => !project.complete)
    default:
      return projects.value
  }
})

const handleDelete = (id: number) => {
  projects.value = projects.value.filter((project) => {
    return project.id !== id
  })
}

const handleComplete = (id: number) => {
  const p = projects.value.find((project) => project.id === id)
  if (p) {
    p.complete = !p.complete
  }
}

onMounted(() => {
  fetch('http://localhost:3000/projects')
    .then((res) => res.json())
    .then((data) => {
      projects.value = data
    })
    .catch((err) => console.log(err.message))
})
</script>

<template>
  <main v-if="filterCriteria">
    <h1>Projects</h1>
    <FilterNav @filterChanged="handleFilterChange" :current="filterCriteria" />

    <div v-if="filteredProjects.length">
      <SingleProject
        @delete="handleDelete"
        @complete="handleComplete"
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </main>
</template>
