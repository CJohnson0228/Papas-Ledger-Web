import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Outlet />
    </div>
  )
}

export default AuthLayout
