<script setup lang="ts">
import SingleProject from '@/components/SingleProject.vue'
import { onMounted, ref } from 'vue'
import type { Project } from '@/types/Project'

const projects = ref<Project[]>([])

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
    .then((data) => (projects.value = data))
    .catch((err) => console.log(err.message))
})
</script>

<template>
  <main>
    <h1>Projects</h1>
    <div v-if="projects.length">
      <SingleProject
        @delete="handleDelete"
        @complete="handleComplete"
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </main>
</template>
