import { atom } from "jotai";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetAtom<Args extends any[], Result> = (...args: Args) => Result


interface EntryType {
  date: Date
  payee: string
  debit: boolean
  amount: number
  category: string
  checkNumber?: number
}

interface AccountType {
  name: string
  openningDate: Date
  openingBalance: number
  entries: EntryType[]
}

interface UserType {
  uid?: string
  firstName?: string
  lastName?: string
  initials?: string
  email?: string
  accounts?: AccountType[]
}

export const defaultUser: UserType = {
  uid: '',
  firstName: '',
  lastName: '',
  initials: '',
  email: '',
  accounts: [],
}

export const userAtom = atom<UserType>(defaultUser)
userAtom.debugLabel = 'User State'