<template>
<h1>Edit project</h1>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input type="text" required v-model="title" />
    <label>Details:</label>
    <textarea required v-model="details"></textarea>
    <button>Edit Project</button>
  </form>
</template>
<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps(['id']);

const uri = 'http://localhost:3000/projects/' + props.id
const title = ref<string>('')
const details = ref<string>('')

onMounted(() => {
  fetch(uri)
    .then((res) => res.json())
    .then((project) => {
      title.value = project.title
      details.value = project.details
    })
})

const handleSubmit = () => {
  const project = {
    title: title.value,
    details: details.value,
    complete: false,
  }

  fetch(uri, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  }).then(() => {
    router.push('/')
  }).catch( err => console.log(err))
}
</script>
<style>

</style>
