import { defineStore, acceptHMRUpdate } from 'pinia'
import { auth, loginUser, registerUser } from '@/firebase/auth'
import { db } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    loadingUser: true,
  }),

  persist: true,

  actions: {
    async login(email, password) {
      this.loadingUser = true

      try {
        const user = await loginUser(email, password)
        console.log('Usuario logueado:', user.email)
        this.fetchUser()
        this.isLoggedIn = true
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error
      } finally {
        this.loadingUser = false
      }
    },

    async register(email, password) {
      this.loadingUser = true

      try {
        const user = await registerUser(email, password)
        this.user = {
          uid: user.uid,
          email: user.email,
          movements: [],
        }
        await setDoc(doc(db, 'users', user.uid), this.user)

        console.log('Usuario registrado:', user)
        this.isLoggedIn = true
        await this.fetchUser() // Automatically fetch and login the user
      } catch (error) {
        console.error('Error al registrar usuario:', error)
        throw error
      } finally {
        this.loadingUser = false
      }
    },

    async fetchUser() {
      if (this.user) {
        this.loadingUser = false
        return
      }

      this.loadingUser = true

      try {
        const firebaseUser = await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()
            resolve(user)
          })
        })

        if (firebaseUser) {
          const docRef = doc(db, 'users', firebaseUser.uid)
          const docSnap = await getDoc(docRef)
          console.log('docSnap:', docSnap)

          if (docSnap.exists()) {
            this.user = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...docSnap.data(),
            }
            console.log('Usuario cargado:', this.user)
          } else {
            console.log('else')
            this.user = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            }
          }
          this.isLoggedIn = true
        } else {
          this.user = null
          this.isLoggedIn = false
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error)
        this.user = null
        this.isLoggedIn = false
      } finally {
        this.loadingUser = false
      }
    },

    logout() {
      auth.signOut()
      this.user = null
      this.isLoggedIn = false
      this.loadingUser = false
      console.log('Usuario desconectado')
    },
    getBalance() {
      if (this.user && this.user.movements) {
        return this.user.movements.reduce((acc, movement) => acc + movement.amount, 0)
      }
      return 0
    },
    getMovements() {
      if (this.user && this.user.movements) {
        return this.user.movements.sort((a, b) => new Date(b.date) - new Date(a.date))
      }
      return []
    },

    async addMovement(amount) {
      const date = new Date().toISOString()
      if (this.user) {
        if (!this.user.movements) {
          this.user.movements = []
        }
        this.user.movements.push({ amount, date })
        console.log('Movimiento agregado:', { amount, date })
        await setDoc(
          doc(db, 'users', this.user.uid),
          { movements: this.user.movements },
          { merge: true },
        )

        console.log('Nuevo balance:', this.getBalance())
      } else {
        console.error('No hay usuario conectado para agregar movimiento')
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
