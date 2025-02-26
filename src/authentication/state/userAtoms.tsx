import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetAtom<Args extends any[], Result> = (...args: Args) => Result


export interface EntryType {
  date: Date
  payee: string
  debit: boolean
  amount: number
  category: string
  checkNumber?: number
}

export interface AccountType {
  name: string
  openningDate: Date
  openningBalance: number
  entries: EntryType[]
}

export interface UserType {
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

export const accountsAtom = focusAtom(userAtom, (optic) => optic.prop('accounts'))
accountsAtom.debugLabel = 'Accounts State'