<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { computed } from 'vue'

const userStore = useUserStore()
const movements = computed(() => userStore.getMovements())
const balance = computed(() => userStore.getBalance())

const showDepositModal = ref(false)
const showWithdrawModal = ref(false)
const amountInput = ref(0)

const openModal = (type) => {
  amountInput.value = 0
  if (type === 'deposit') showDepositModal.value = true
  else showWithdrawModal.value = true
}

const closeModal = () => {
  showDepositModal.value = false
  showWithdrawModal.value = false
}

const confirmTransaction = (type) => {
  const amount = Number(amountInput.value)
  if (isNaN(amount) || amount <= 0) return
  if (type === 'deposit') deposit(amount)
  else withdraw(amount)
  closeModal()
}

const withdraw = (amount) => {
  userStore.addMovement(-amount)
}
const deposit = (amount) => {
  userStore.addMovement(amount)
}
</script>

<template>
  <div class="flex flex-col items-center bg-white min-h-screen">
    <h2 class="text-2xl font-medium text-gray-900 mt-8 mb-4">Mi Saldo:</h2>
    <div class="text-6xl font-bold text-indigo-600">
      $ {{ Number(balance).toLocaleString('es-CL', { minimumFractionDigits: 0 }) }}
    </div>

    <div class="flex space-x-4 mt-6">
      <button
        @click="openModal('deposit')"
        class="px-6 py-2 rounded-2xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all shadow-md"
      >
        Depositar
      </button>
      <button
        @click="openModal('withdraw')"
        class="px-6 py-2 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md"
      >
        Retirar
      </button>
    </div>

    <div class="w-full max-w-md mt-10">
      <h3 class="text-xl font-semibold mb-2 text-gray-800">Movimientos</h3>
      <ul>
        <li
          v-for="(movement, idx) in movements"
          :key="idx"
          :class="[
            'flex justify-between items-center p-3 mb-2 rounded',
            movement.amount < 0 ? 'bg-red-100' : 'bg-gray-100',
          ]"
        >
          <div class="flex flex-col">
            <span class="text-xs text-gray-500">
              {{
                new Date(movement.date).toLocaleDateString('es-CL', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              }}
              {{
                new Date(movement.date).toLocaleTimeString('es-CL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
            </span>
            <span class="font-medium">{{ movement.description }}</span>
          </div>
          <span :class="movement.amount < 0 ? 'text-red-600' : 'text-green-600'">
            {{ movement.amount < 0 ? '-' : '+' }}${{
              Math.abs(movement.amount).toLocaleString('es-CL', { minimumFractionDigits: 0 })
            }}
          </span>
        </li>
      </ul>
    </div>

    <transition name="fade">
      <div
        v-if="showDepositModal || showWithdrawModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl p-6 w-80 shadow-xl transform transition-all scale-100">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ showDepositModal ? 'Depositar' : 'Retirar' }} Monto
          </h3>
          <input
            v-model="amountInput"
            type="number"
            min="1"
            placeholder="Ingrese cantidad"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
          />
          <div class="flex justify-end space-x-2">
            <button
              @click="closeModal"
              class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancelar
            </button>
            <button
              @click="confirmTransaction(showDepositModal ? 'deposit' : 'withdraw')"
              :class="[
                'px-4 py-2 rounded-lg text-white font-semibold',
                showDepositModal
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600',
              ]"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
