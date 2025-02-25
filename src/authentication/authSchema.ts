import { z } from 'zod'

const firstNameSchema = z
  .string()
  .min(2, { message: 'First name must be at least 2 characters' })
  .max(50, { message: 'First name must be no more than 50 characters' })

const lastNameSchema = z
  .string()
  .min(2, { message: 'Last name must be at least 2 characters' })
  .max(50, { message: 'Last name must be no more than 50 characters' })

const emailSchema = z
  .string()
  .email({ message: 'Must enter a valid Email Address' })

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(20, { message: 'password cannot be longer than 20 characters' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must have at least 1 Uppercase Character',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must have at least 1 Lowercase Character',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must have at least 1 number',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must have at least 1 special Character',
  })

export { emailSchema, firstNameSchema, lastNameSchema, passwordSchema }
