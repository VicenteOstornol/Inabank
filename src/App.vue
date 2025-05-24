<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <h1 class="text-3xl font-bold underline text-red-500">Hello world!</h1>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
