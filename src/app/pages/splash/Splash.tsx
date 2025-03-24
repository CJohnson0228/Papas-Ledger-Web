import { Button } from "@/components/ui/button"
import { useGSAP } from '@gsap/react'
import gsap from "gsap"
import { useNavigate } from "react-router"

function Splash() {
  const navigate = useNavigate()

  useGSAP(() => {
    gsap.from('#Splash-Heading', { opacity: 0, scale: 0, duration: 0.5, ease: 'power1.inOut' })
    gsap.from('#Splash-Slogan', { opacity: 0, y: 100, scale: 0, duration: 0.5, delay: 0.3, ease: 'power1.inOut' })
    gsap.from('#Splash-Button', { opacity: 0, y: 200, duration: 0.5, delay: 0.5, ease: 'power1.inOut' })
  })

  const handleBegin = () => {
    gsap.to('#Splash-Button', { opacity: 0, y: 200, duration: 0.5, ease: 'power1.inOut' })
    gsap.to('#Splash-Slogan', { opacity: 0, y: 100, scale: 0, duration: 0.5, delay: 0.3, ease: 'power1.inOut' })
    gsap.to('#Splash-Heading', { opacity: 0, scale: 0, duration: 0.5, delay: 0.3, ease: 'power1.inOut', onComplete: () => { navigate('/login') } })
  }

  return (
    <div id='Splash-Page' className="relative flex flex-col justify-center items-center gap-5 w-screen h-screen">
      <div id='Splash-Heading' className="flex flex-col justify-center items-center mb-3">
        <div className="font-heading text-primary text-4xl md:text-7xl">Papa's Ledger</div>
        <div className="self-center -mt-2 text-muted-foreground md:text-md text-xs">Track Every Dollar, Balance Every Account</div>
      </div>
      <div id='Splash-Slogan' className="flex flex-col justify-center items-center max-w-4xl">
        <div className="mb-3 text-lg text-center">Master Your Money with Ease</div>
        <div className="text-muted-foreground md:text-md text-sm text-center">Stay on top of your finances with seamless checkbook-style tracking across multiple accounts.</div>
        <div className="text-muted-foreground md:text-md text-sm text-center">Simple, powerful, and always in sync—because every dollar counts.</div>
      </div>
      <div id='Splash-Button' className="mt-5">
        <Button onClick={handleBegin}>BEGIN</Button>
      </div>
    </div>
  )
}

export default Splash
