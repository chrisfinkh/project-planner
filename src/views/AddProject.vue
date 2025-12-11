<template>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input type="text" required v-model="title" />
    <label>Details:</label>
    <textarea required v-model="details"></textarea>
    <button>Add Project</button>
  </form>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const uri = 'http://localhost:3000/projects'

const title = ref<string>('')
const details = ref<string>('')

const handleSubmit = () => {
  const project = {
    title: title.value,
    details: details.value,
    complete: false,
  }
  fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  }).then(() => {
    router.push('/')
  })
}
</script>

<style>
form {
  padding: 20px;
  border-radius: 10px;
}

label {
  display: block;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}

input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}

@media (prefers-color-scheme: dark) {
  input,
  textarea {
    background-color: rgb(32, 32, 32);
    color: rgb(198, 198, 198);
    border-color: rgb(136, 136, 136);
  }
}
</style>
