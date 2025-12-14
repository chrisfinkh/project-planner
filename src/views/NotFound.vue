<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <button @click="router.push('/')">Go Home</button>
  </main>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found h1 {
  font-size: 6rem;
  margin: 0;
  color: rgb(0, 189, 126);
}

.not-found p {
  font-size: 1.5rem;
  margin: 20px 0 30px;
}

.not-found button {
  background: rgb(0, 189, 126);
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
