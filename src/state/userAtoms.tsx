import { atom } from "jotai";

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
  uid: string
  firstName: string
  lastName: string
  email: string
  accounts: AccountType[]
}

const defaultUser: UserType = {
  uid: '',
  firstName: '',
  lastName: '',
  email: '',
  accounts: [],
}

export const UserAtom = atom<UserType>(defaultUser)