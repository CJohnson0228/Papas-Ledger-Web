import { isAuthAtom } from "@/state/AppAtoms"
import { useAtomValue } from "jotai"
import { useNavigate } from "react-router"
import { Button } from "../ui/button"

function Navbar() {
  const isAuth = useAtomValue(isAuthAtom)
  const navigate = useNavigate()

  return (
    <div id='Navbar' className='top-0 left-0 z-10 fixed bg-primary p-1 w-screen text-primary-foreground'>
      <div className="flex justify-between items-center mx-auto max-w-7xl h-[44px] container">
        <div className="flex items-center gap-3 font-heading text-xl">
          <img src="/favicon-32x32.png" alt="Aim High" />
          Papa's Ledger
        </div>
        {!isAuth && <Button variant='ghost' onClick={() => navigate('/login')}>LOGIN</Button>}
        {isAuth &&
          <div>
            {/* add authed items here  */}
            Auth Buttons
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
