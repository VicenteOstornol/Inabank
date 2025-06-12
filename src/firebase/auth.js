import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { app, db } from './config'
import { doc, setDoc } from 'firebase/firestore'

export const auth = getAuth(app)

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      balance: 0,
    })
    return user
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
