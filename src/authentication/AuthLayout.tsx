import { isAuthAtom } from "@/state/AppAtoms"
import { defaultUser, userAtom } from "@/state/userAtoms"
import supabase from "@/utils/supabaseClient"
import { useSetAtom } from "jotai"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import useAuth from "./useAuth"

function AuthLayout() {
  const navigate = useNavigate()
  const setUserData = useSetAtom(userAtom)
  const setIsAuth = useSetAtom(isAuthAtom)
  const { isLoading } = useAuth()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserData({
          uid: session.user?.id,
          firstName: session.user?.user_metadata.firstName,
          lastName: session.user?.user_metadata.lastName,
          initials: session.user?.user_metadata.initials,
          email: session.user?.user_metadata.email,
        })
        setIsAuth(true)
        navigate('/dashboard')
      } else {
        setIsAuth(false)
        setUserData(defaultUser)
      }
    })

    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserData({
          uid: session.user?.id,
          firstName: session.user?.user_metadata.firstName,
          lastName: session.user?.user_metadata.lastName,
          initials: session.user?.user_metadata.initials,
          email: session.user?.user_metadata.email,
        })
        setIsAuth(true)
        navigate('/dashboard')
      } else {
        setIsAuth(false)
        setUserData(defaultUser)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Outlet />
      {isLoading && <div className="top-0 right-0 bottom-0 left-0 fixed flex justify-center items-center bg-black/50">Loading</div>}
    </div>
  )
}

export default AuthLayout
