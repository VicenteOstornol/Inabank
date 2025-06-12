import { defineStore } from 'pinia'
import { auth, loginUser, registerUser } from '@/firebase/auth'
import { db } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loadingUser: true,
  }),

  actions: {
    async login(email, password) {
      this.loadingUser = true

      try {
        const user = await loginUser(email, password)
        console.log('Usuario logueado:', user.email)
        this.user = {
          uid: user.uid,
          email: user.email,
        }
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
        console.log('Usuario registrado:', user.email)
        this.user = {
          uid: user.uid,
          email: user.email,
          balance: 0,
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error)
        throw error
      } finally {
        this.loadingUser = false
      }
    },

    async fetchUser() {
      this.loadingUser = true

      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const docRef = doc(db, 'users', firebaseUser.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            this.user = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...docSnap.data(),
            }
            console.log('Usuario cargado:', this.user)
          } else {
            this.user = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            }
          }
        } else {
          this.user = null
        }

        this.loadingUser = false
      })
    },

    logout() {
      auth.signOut()
      console.log('entre al logout')
      this.user = null
    },
  },
})
