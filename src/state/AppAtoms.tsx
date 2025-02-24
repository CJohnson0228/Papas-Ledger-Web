import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

interface AppStateType {
  isAuth: boolean
  isSidebarOpen: boolean
}

const defaultState: AppStateType = {
  isAuth: false,
  isSidebarOpen: false
}

export const appStateAtom = atom<AppStateType>(defaultState)

export const isAuthAtom = focusAtom(appStateAtom, (optic) => optic.prop('isAuth'))

export const isSidebarOpenAtom = focusAtom(appStateAtom, (optic) => optic.prop('isSidebarOpen'))