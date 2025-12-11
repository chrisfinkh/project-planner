<script setup lang="ts">
import SingleProject from '@/components/SingleProject.vue'
import { computed, onMounted, ref } from 'vue'
import type { Project } from '@/types/Project'
import FilterNav from '@/components/FilterNav.vue'

const projects = ref<Project[]>([])
const filterCriteria = ref("all")

const filteredProjects = computed(() => {
    switch (filterCriteria.value) {
    case "completed":
      return projects.value.filter(project => project.complete)
    case "ongoing":
      return projects.value.filter(project => !project.complete)
    default:
      return projects.value;
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
  <main>
    <h1>Projects</h1>
    <FilterNav @filterChanged="filterCriteria = $event" :current="filterCriteria"/>

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
