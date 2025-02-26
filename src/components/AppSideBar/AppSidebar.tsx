import { isSidebarOpenAtom } from "@/app/state/AppAtoms";
import { accountsAtom } from "@/authentication/state/userAtoms";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAtom, useAtomValue } from "jotai";
import { IoAddCircleOutline, IoCaretBack, IoCashOutline, IoMenu } from "react-icons/io5";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

// Openned Sidebar
const OpenSideBar = ({ setSidebarClosed }: { setSidebarClosed: () => void }) => {
  const accounts = useAtomValue(accountsAtom)
  // enter animation
  useGSAP(() => { gsap.fromTo('#Open-Sidebar', { x: -204 }, { x: 0, duration: 0.5, ease: 'power1.inOut' }) })
  // close animation
  const handleClose = () => {
    gsap.to('#Open-Sidebar', { x: -204, duration: 0.5, ease: 'power1.inOut', onComplete: setSidebarClosed })
  }

  return (
    <div
      id='Open-Sidebar'
      className='flex flex-col justify-start items-center bg-input pt-[52px] w-52 h-screen'>
      {/* Trigger Button */}
      <Button
        size='icon'
        variant='ghost'
        className="flex justify-between items-center p-2 rounded-none w-full"
        onClick={handleClose}>
        <IoCaretBack />
        Close
      </Button>
      {/* Filler Data */}
      <Separator className="bg-muted-foreground/20" />
      {accounts?.map((account) =>
        <Button variant='ghost' className="flex justify-between items-center p-2 w-full"><IoCashOutline /> {account.name}</Button>
      )}
      {/* Add Account Button */}
      <Separator className="bg-muted-foreground/20" />
      <Button variant='ghost' className="flex justify-between items-center p-2 rounded-none w-full">
        <IoAddCircleOutline /> Add Account
      </Button>
    </div>
  )
}

// Collapsed Sidebar
const ClosedSideBar = ({ setSidebarOpen }: { setSidebarOpen: () => void }) => {
  const accounts = useAtomValue(accountsAtom)
  // enter animation
  useGSAP(() => { gsap.fromTo('#Closed-Sidebar', { x: -44 }, { x: 0, duration: 0.5, ease: 'power1.inOut' }) })
  // close animation
  const handleOpen = () => {
    gsap.to('#Closed-Sidebar', { x: -44, duration: 0.5, ease: 'power1.inOut', onComplete: setSidebarOpen })
  }

  return (
    <div
      id='Closed-Sidebar'
      className='flex flex-col justify-start items-center bg-input pt-[52px] w-11 h-screen'>
      {/* Trigger Button */}
      <Button
        size='icon'
        variant='ghost'
        className="rounded-none w-11 h-11"
        onClick={handleOpen}>
        <IoMenu />
      </Button>
      {/* Filler Data */}
      <Separator className="bg-muted-foreground/20" />
      {accounts?.map((account) =>
        <Button
          size='icon'
          variant='ghost'
          className="rounded-none w-11 h-11"><IoCashOutline /></Button>
      )}

      {/* Add Account Button */}
      <Separator className="bg-muted-foreground/20" />
      <Button
        size='icon'
        variant='ghost'
        className="rounded-none w-11 h-11">
        <IoAddCircleOutline />
      </Button>
    </div>
  )
}

// Main Sidebar Component
function AppSideBar() {
  const [isSidebarOpen, setSidebarOpen] = useAtom(isSidebarOpenAtom)

  return (
    isSidebarOpen
      ? <OpenSideBar setSidebarClosed={() => setSidebarOpen(false)} />
      : <ClosedSideBar setSidebarOpen={() => setSidebarOpen(true)} />
  )
}

export default AppSideBar