<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './stores/users'
import HeaderComponent from './components/HeaderComponent.vue'
import { RouterView } from 'vue-router'

const userStore = useUserStore()

onMounted(() => {
  if (!userStore.user) {
    userStore.fetchUser()
  }
})
</script>

<template>
  <HeaderComponent />
  <RouterView />
</template>

<style scoped></style>
