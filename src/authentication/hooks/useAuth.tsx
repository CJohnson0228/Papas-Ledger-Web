import { isAuthAtom } from "@/app/state/AppAtoms";
import { defaultUser, SetAtom, userAtom } from "@/authentication/state/userAtoms";
import supabase from "@/config/supabaseClient";
import { SetStateAction, useSetAtom } from "jotai";
import { useState } from "react";

function useAuth() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Jotai State functions
  const setUserData = useSetAtom(userAtom)
  const setIsAuth = useSetAtom(isAuthAtom)

  // Auth Functions
  // === signIn Function
  const signIn = async ({ email, password }: { email: string, password: string }) => {
    // reset loading and error state
    setIsLoading(true)
    setError(null)

    // login to Supabase
    supabase.auth.signInWithPassword({ email: email, password: password })
      // error handling
      .catch((error) => {
        if (error) {
          console.log(error)
          setError(error.message)
        }
      })
      // update Jotai State on success
      .then((data) => {
        if (data) {
          // ==============> need to pull accounts from database here
          setUserData({
            uid: data.data.user?.id,
            firstName: data.data.user?.user_metadata.firstName,
            lastName: data.data.user?.user_metadata.lastName,
            initials: data.data.user?.user_metadata.initials,
            email: data.data.user?.email,
          })
          setIsAuth(true)
        }
      })
      .then(() => setIsLoading(false))
  }

  // === signUp Function
  const signUp = async (
    { firstName, lastName, initials, email, password }:
      { firstName: string, lastName: string, initials: string, email: string, password: string }
  ) => {
    // reset loading and error state
    setIsLoading(true)
    setError(null)

    // Structure Data for Supabase User
    const submissionData = {
      email: email,
      password: password,
      options: {
        data: {
          firstName: firstName,
          lastName: lastName,
          initials: initials,
        }
      }
    }

    // Signup with Supabase
    supabase.auth.signUp(submissionData)
      // error handling
      .catch((error) => {
        if (error) {
          console.log(error)
          setError(error.message)
        }
      })
      .then((data) => {
        if (data) {
          // ==============> need to pull accounts from database here
          setUserData({
            uid: data.data.user?.id,
            firstName: data.data.user?.user_metadata.firstName,
            lastName: data.data.user?.user_metadata.lastName,
            initials: data.data.user?.user_metadata.initials,
            email: data.data.user?.email,
          })
          setIsAuth(true)
        }
      })
      .then(() => setIsLoading(false))
  }

  // === signOut Function
  const signOut = async () => {
    // reset loading and error state
    setIsLoading(true)
    setError(null)

    supabase.auth.signOut()
      .catch((error) => {
        if (error) {
          setError(error.message)
        }
      })
      .then(() => setUserData(defaultUser))
      .then(() => setIsAuth(false))
      .then(() => setIsLoading(false))
  }

  // === updateUser Function
  const updateUser = async ({ element, updateFunc, value }: { element: string, updateFunc: SetAtom<[SetStateAction<string | undefined>], void>, value: string }) => {
    supabase.auth.updateUser({ data: { [element]: value === '' ? null : value } })
      .catch((error) => {
        if (error) { setError(error) }
      })
      .then(() => {
        updateFunc(value)
      })
  }


  return { error, isLoading, signIn, signUp, signOut, updateUser }
}

export default useAuth