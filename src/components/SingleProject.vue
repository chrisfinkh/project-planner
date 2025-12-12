<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
      <div class="icons">
        <RouterLink :to="{ name: 'EditProject', params: { id: project.id } }">
          <span class="material-symbols-outlined">edit</span>
        </RouterLink>
        <span class="material-symbols-outlined" @click="deleteProject">delete</span>
        <span class="material-symbols-outlined tick" @click="toggleComplete">check</span>
      </div>
    </div>
    <div class="details" v-if="showDetails">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['project'])
const emit = defineEmits(['delete', 'complete'])
const showDetails = ref<boolean>(false)

const uri = ref<string>('http://localhost:3000/projects/' + props.project.id)

console.log(uri.value)
const deleteProject = async () => {
  try {
    await fetch(uri.value, { method: 'DELETE' })
    emit('delete', props.project.id)
  } catch (err) {
    console.log(err)
  }
}
const toggleComplete = () => {
  fetch(uri.value, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ complete: !props.project.complete }),
  })
    .then(() => {
      emit('complete', props.project.id)
    })
    .catch((err) => console.log(err))
}
</script>
<style>
.project {
  width: 500px;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
  background: rgb(227, 227, 227);
}

.details {
  text-align: start;
}

h3 {
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons {
  color: rgb(143, 143, 143);
}

.material-symbols-outlined:hover {
  color: rgb(72, 72, 72);
}

.project.complete {
  border-left: 4px solid #00ce89;
}

.project.complete .tick {
  color: #00ce89;
}

@media (prefers-color-scheme: dark) {
  .project {
    background: rgb(47, 47, 47);
  }
}
.actions .icons a {
  color: rgb(143, 143, 143);
}
.actions .icons a:hover {
  background-color: transparent;
}
</style>
