import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from './config'

const auth = getAuth(app)

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('Error logging in user:', error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    console.error('Error logging out user:', error)
    throw error
  }
}
