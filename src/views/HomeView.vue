<script setup lang="ts">
import SingleProject from '@/components/SingleProject.vue';
import { onMounted, ref } from 'vue';

  const projects = ref([]);

  onMounted(() => {
    fetch("http://localhost:3000/projects")
      .then(res => res.json())
      .then(data => projects.value = data)
      .catch(err => console.log(err.message))
  })


</script>

<template>
  <main>
    <h1>Projects</h1>
    <div v-if="projects.length">
      <SingleProject v-for="project in projects" :key="project.id" :project="project"/>
    </div>
  </main>
</template>

