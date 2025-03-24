import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useGSAP } from '@gsap/react'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from "gsap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"
import { emailSchema, passwordSchema } from "../authSchema"
import useAuth from "../hooks/useAuth"

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

function Login() {
  const navigate = useNavigate()
  const { error, signIn } = useAuth()

  useGSAP(() => {
    gsap.from('#Login-Form', {
      opacity: 0,
      x: 200,
      duration: 0.5,
      ease: 'power1.inOut'
    })
  })

  const handleSwitch = () => {
    gsap.to('#Login-Form', {
      opacity: 0,
      x: 200,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => { navigate('/signup') }
    })
  }

  const handleToDashboard = () => {
    gsap.to('#Login-Form', {
      opacity: 0,
      x: 200,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => { navigate('/dashboard') }
    })
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })


  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await signIn({ email: values.email, password: values.password })
    handleToDashboard()
    return
  }


  return (
    <div id='Login-Form' className="w-full max-w-sm">
      <h2 className="text-2xl md:text-4xl text-center">Login</h2>
      {error
        ? <p className="mb-5 text-destructive text-lg md:text-xl text-center">{error}</p>
        : <p className="mb-5 text-muted-foreground text-lg md:text-xl text-center">Enter your credentials</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField control={form.control} name='email' render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Email</FormLabel><FormMessage className="text-red-400" />
              </div>
              <FormControl>
                <Input autoComplete="one-time-code" type='email' placeholder='JohnDoe@email.com' {...field} />
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name='password' render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Password</FormLabel><FormMessage className="text-red-400" />
              </div>
              <FormControl>
                <Input autoComplete="one-time-code" type='password' placeholder='Abcd123!' {...field} />
              </FormControl>
            </FormItem>
          )} />
          <div className="flex justify-center items-center my-5">
            <div className="text-muted-foreground text-sm">
              Need an account?
              <span onClick={handleSwitch} className="px-3 rounded-md h-8 text-primary hover:underline underline-offset-4 cursor-pointer">
                Register
              </span>
            </div>
          </div>
          <div className="w-full">
            <Button type='submit' className="w-full">LOGIN</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Login
