import Footbar from "@/components/Footbar"
import Navbar from "@/components/Navbar"
import { DevTools } from "jotai-devtools"
import { Outlet } from "react-router"

function AppLayout() {
  return (
    <div id='App' className="w-screen h-screen overflow-hidden">
      <Navbar />
      <Outlet />
      <Footbar />
      <DevTools />
    </div>
  )
}

export default AppLayout
