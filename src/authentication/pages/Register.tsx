import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useGSAP } from '@gsap/react'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from "gsap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"
import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema } from "../authSchema"
import useAuth from "../useAuth"

const signUpSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema
})

function Register() {
  const navigate = useNavigate()
  const { error, signUp } = useAuth()

  useGSAP(() => {
    gsap.from('#Signup-Form', {
      opacity: 0,
      x: -200,
      duration: 0.5,
      ease: 'power1.inOut'
    })
  })

  const handleSwitch = () => {
    gsap.to('#Signup-Form', {
      opacity: 0,
      x: -200,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => { navigate('/login') }
    })
  }

  const handleToDashboard = () => {
    gsap.to('#Signup-Form', {
      opacity: 0,
      x: 200,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => { navigate('/dashboard') }
    })
  }

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  })


  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await signUp({
      firstName: values.firstName,
      lastName: values.lastName,
      initials: values.firstName.slice(0, 1) + values.lastName.slice(0, 1),
      email: values.email,
      password: values.password
    })
    handleToDashboard()
    return
  }

  return (
    <div id='Signup-Form' className="w-full max-w-sm">
      <h2 className="text-2xl md:text-4xl text-center">Register</h2>
      {error
        ? <p className="mb-5 text-destructive text-lg md:text-xl text-center">{error}</p>
        : <p className="mb-5 text-muted-foreground text-lg md:text-xl text-center">Enter your credentials</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField control={form.control} name='firstName' render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel><FormMessage className="text-red-400" />
              <FormControl>
                <Input autoComplete="one-time-code" type='firstName' id='firstName' placeholder='John' {...field} />
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name='lastName' render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel><FormMessage className="text-red-400" />
              <FormControl>
                <Input autoComplete="one-time-code" type='lastName' id='lastName' placeholder='Doe' {...field} />
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name='email' render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel><FormMessage className="text-red-400" />
              <FormControl>
                <Input autoComplete="one-time-code" type='email' id='email' placeholder='JohnDoe@email.com' {...field} />
              </FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name='password' render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel><FormMessage className="text-red-400" />
              <FormControl>
                <Input autoComplete="one-time-code" type='password' id='password' placeholder='Abcd123!' {...field} />
              </FormControl>
            </FormItem>
          )} />
          <div className="flex justify-center items-center my-5">
            <div className="text-muted-foreground text-sm">
              already a member?
              <span onClick={handleSwitch} className="px-3 rounded-md h-8 text-primary hover:underline underline-offset-4 cursor-pointer">
                Login
              </span>
            </div>
          </div>
          <div className="w-full">
            <Button type='submit' className="w-full">REGISTER</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Register
