<script setup lang="ts">
import { ref } from 'vue'
import { loginUser } from '@/firebase/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Todos los campos son obligatorios.'
    return
  }
  loading.value = true
  try {
    await loginUser(email.value, password.value)
    alert('¡Inicio de sesión exitoso!')
  } catch (err) {
    if (err && err.code === 'auth/user-not-found') {
      error.value = 'Usuario no encontrado.'
    } else if (err && err.code === 'auth/wrong-password') {
      error.value = 'Contraseña incorrecta.'
    } else if (err && err.code === 'auth/invalid-email') {
      error.value = 'Correo inválido.'
    } else {
      error.value = 'Error al iniciar sesión. Intenta nuevamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template v-if="isLoginIn">
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Ingresa a tu cuenta
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit="handleSubmit">
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              :required="true"
              v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Contraseña</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              :required="true"
              v-model="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        ¿No tienes cuenta?
        <a
          href="signup"
          class="font-semibold underline leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Registrate
        </a>
      </p>
    </div>
  </div>
</template>
