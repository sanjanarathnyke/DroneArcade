import 'tailwindcss/tailwind.css';
import './App.css';
import TitleBar from './components/TitleBar';
import { useScreenStore } from './stores/screen-store';
import StartingScreen from './components/StartingScreen';
import MainPage from './components/MainPage';
import {useEffect} from 'react';

export default function App() {


  const loadingScreen = useScreenStore((state) => state.loadingScreen);
  const setLoadingScreen = useScreenStore((state) => state.setLoadingScreen);

  useEffect(()=>{
    window.electron.ipcRenderer.sendMessage('ipc-connect-db');
    setLoadingScreen(true);
    setTimeout(()=>{setLoadingScreen(false)},2000);
  },[])




  return (
    <main className="App bg-[#001b41]">
      <TitleBar />
      {loadingScreen  ? (
        <StartingScreen />
      ) : (
        <>
          <MainPage/>
        </>

      )}
    </main>
  );
}
