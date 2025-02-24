import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGSAP } from '@gsap/react'
import gsap from "gsap"
import { useNavigate } from "react-router"

function Register() {
  const navigate = useNavigate()

  useGSAP(() => {
    gsap.from('#Signup-Form', { opacity: 0, x: -200, duration: 0.5, ease: 'power1.inOut' })
  })

  const handleSwitch = () => {
    gsap.to('#Signup-Form', { opacity: 0, x: -200, duration: 0.5, ease: 'power1.inOut', onComplete: () => { navigate('/login') } })
  }

  return (
    <div id='Signup-Form' className="w-full max-w-sm">
      <div className="text-2xl md:text-4xl text-center">Register</div>
      <div className="mb-5 text-lg md:text-xl text-center">Enter your Credentials</div>
      <div className="items-center gap-1.5 grid mb-5 w-full">
        <Label htmlFor='firstName'>First Name</Label>
        <Input autoComplete="one-time-code" type='firstName' id='firstName' placeholder='John' />
      </div>
      <div className="items-center gap-1.5 grid mb-5 w-full">
        <Label htmlFor='lastName'>Last Name</Label>
        <Input autoComplete="one-time-code" type='lastName' id='lastName' placeholder='Doe' />
      </div>
      <div className="items-center gap-1.5 grid mb-5 w-full">
        <Label htmlFor='email'>Email</Label>
        <Input autoComplete="one-time-code" type='email' id='email' placeholder='JohnDoe@email.com' />
      </div>
      <div className="items-center gap-1.5 grid mb-3 w-full">
        <Label htmlFor='password'>Password</Label>
        <Input autoComplete="one-time-code" type='password' id='password' placeholder='Abcd123!' />
      </div>
      <div className="mb-3 text-sm text-center">already a member?
        <Button variant='link' size='sm' onClick={handleSwitch}>Login</Button>
      </div>
      <div className="w-full">
        <Button className="w-full">REGISTER</Button>
      </div>
    </div>
  )
}

export default Register
