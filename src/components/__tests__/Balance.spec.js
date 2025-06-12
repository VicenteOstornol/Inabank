import { mount } from '@vue/test-utils'
import Balance from '../../views/MyBalanceView.vue'
import { vi } from 'vitest'
import { useUserStore } from '@/stores/users'
import { describe, it, beforeEach, expect } from 'vitest'

vi.mock('@/stores/users', () => ({
  useUserStore: vi.fn(),
}))

describe('Balance.vue', () => {
  const mockAddMovement = vi.fn()
  const mockStore = {
    getMovements: vi.fn(() => []),
    getBalance: vi.fn(() => 1000),
    addMovement: mockAddMovement,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useUserStore.mockReturnValue(mockStore)
  })

  it('abre el modal de depósito al hacer clic en "Depositar"', async () => {
    const wrapper = mount(Balance)

    const buttons = wrapper.findAll('button')
    const depositBtn = buttons.find(btn => btn.text() === 'Depositar')
    expect(depositBtn).toBeTruthy()

    await depositBtn.trigger('click')

    expect(wrapper.text()).toContain('Depositar Monto')
  })

  it('ejecuta un depósito válido', async () => {
    const wrapper = mount(Balance)

    const depositBtn = wrapper.findAll('button').find(btn => btn.text() === 'Depositar')
    await depositBtn.trigger('click')

    const input = wrapper.find('input[type="number"]')
    await input.setValue('500')

    const confirmBtn = wrapper.findAll('button').find(btn => btn.text() === 'Confirmar')
    await confirmBtn.trigger('click')

    expect(mockAddMovement).toHaveBeenCalledWith(500)
  })

  it('no ejecuta transacción con monto inválido', async () => {
    const wrapper = mount(Balance)

    const depositBtn = wrapper.findAll('button').find(btn => btn.text() === 'Depositar')
    await depositBtn.trigger('click')

    const input = wrapper.find('input[type="number"]')
    await input.setValue('0')

    const confirmBtn = wrapper.findAll('button').find(btn => btn.text() === 'Confirmar')
    await confirmBtn.trigger('click')

    expect(mockAddMovement).not.toHaveBeenCalled()
  })
})