import {create} from 'zustand';

type ScreenState = {
  currentScreen:string
  setScreen: (s:string)=>void
  currentLoadingScreen:string
  setCurrentLoadingScreen: (s:string)=>void
  loadingScreen:boolean
  setLoadingScreen:(x:boolean)=>void
  startingScreen:boolean
}

export const useScreenStore = create<ScreenState>()((set)=>({
  currentScreen:"C",
  setScreen:(s)=>set(()=>({currentScreen:s})),
  currentLoadingScreen:"s",
  setCurrentLoadingScreen:((s)=>set(()=>({currentLoadingScreen:s}))),
  loadingScreen:false,
  setLoadingScreen:(x)=>set(()=>({loadingScreen:x})),
  startingScreen:false,
}))
