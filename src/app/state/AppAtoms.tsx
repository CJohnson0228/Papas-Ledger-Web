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
appStateAtom.debugLabel = 'App State'

export const isAuthAtom = focusAtom(appStateAtom, (optic) => optic.prop('isAuth'))
isAuthAtom.debugLabel = 'isAuth'

export const isSidebarOpenAtom = focusAtom(appStateAtom, (optic) => optic.prop('isSidebarOpen'))
isSidebarOpenAtom.debugLabel = 'isSidebarOpen'