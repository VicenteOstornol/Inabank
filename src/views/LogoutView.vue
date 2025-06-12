<!-- src/views/LogoutView.vue -->
<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  await userStore.logout()
  console.log('hola')
  router.push('/login')
})
</script>

<template>
  <div></div>
</template>
