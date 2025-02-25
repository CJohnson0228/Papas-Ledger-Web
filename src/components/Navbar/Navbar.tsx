import useAuth from "@/authentication/useAuth"
import { isAuthAtom } from "@/state/AppAtoms"
import { userAtom } from "@/state/userAtoms"
import { useAtomValue } from "jotai"
import { IoCaretDownOutline } from "react-icons/io5"
import { useNavigate } from "react-router"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

function Navbar() {
  const isAuth = useAtomValue(isAuthAtom)
  const { signOut } = useAuth()
  const user = useAtomValue(userAtom)

  const navigate = useNavigate()

  const handleLogOut = async () => signOut()

  return (
    <div id='Navbar' className='top-0 left-0 z-10 fixed bg-primary p-1 w-screen text-primary-foreground'>
      <div className="flex justify-between items-center mx-auto max-w-7xl h-[44px] container">
        <div className="flex items-center gap-3 font-heading text-xl">
          <img src="/favicon-32x32.png" alt="Aim High" />
          Papa's Ledger
        </div>
        {!isAuth && <Button variant='ghost' onClick={() => navigate('/login')}>LOGIN</Button>}
        {isAuth &&
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='sm' variant='ghost'>
                {user.firstName + ' ' + user.lastName}<IoCaretDownOutline />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onClick={handleLogOut}>
                <div>Log out</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  )
}

export default Navbar
