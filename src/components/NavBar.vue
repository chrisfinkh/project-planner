<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'Home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'AddProject' }">Add Project</RouterLink>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts"></script>
<style>
a.router-link-active {
  border-bottom: 2px solid hsla(160, 100%, 37%, 1);
}
.wrapper {
  padding: 10px 0 20px 0;
}
</style>
