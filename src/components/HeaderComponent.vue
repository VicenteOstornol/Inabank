<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Inabank Logo</span>
          <img class="h-20 w-auto" src="/src/assets/logo.png" alt="Palta sonrojada" />
        </a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="text-sm font-semibold leading-6 text-gray-900"
          >{{ item.name }}</a
        >
      </div>
      <div v-if="!user" class="flex flex-1 items-center justify-end gap-x-6">
        <a href="login" class="lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
          >Iniciar Sesión</a
        >
        <a
          href="signup"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Registrate</a
        >
      </div>
      <div v-else class="flex flex-1 items-center justify-end gap-x-6">
        <a
          href="logout"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Cerrar Sesión</a
        >
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
import { computed } from 'vue'

const navigation = computed(() =>
  [
    { name: 'Inicio (pronto)', href: '#' },
    { name: 'Nosotros (pronto)', href: '#' },
    { name: 'Mi Saldo', href: 'my-balance', isProtected: true },
  ].filter((item) => !item.isProtected || (item.isProtected && user.value)),
)
</script>
