<script setup lang="ts">
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

console.log('User balance:', user)
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-white">
    <h2 class="text-2xl font-medium text-gray-900 mt-8 mb-4">Mi Saldo:</h2>
    <div class="text-6xl font-bold text-indigo-600">
      $ {{ Number(user.balance).toLocaleString('es-CL', { minimumFractionDigits: 0 }) }}
    </div>
  </div>
</template>
