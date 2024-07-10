import 'tailwindcss/tailwind.css';
import './App.css';
import TitleBar from './components/TitleBar';
import Navbar from './components/Navbar';
import UpdateScreen from './components/UpdateScreen';
import FilterScreen from './components/FilterScreen';
import CreateNewScreen from './components/CreateNewScreen';
import Footer from './components/Footer';
import { useScreenStore } from './stores/screen-store';
import { SuccessInsertPopup, FailedInsertPopup } from './components/Popups';
import LoadingScreen from './components/LoadingScreen';
import StartingScreen from './components/StartingScreen';
import {useEffect} from 'react';

export default function App() {


  const currentScreen = useScreenStore((state) => state.currentScreen);
  const loadingScreen = useScreenStore((state) => state.loadingScreen);
  const currentLoadingScreen = useScreenStore(
    (state) => state.currentLoadingScreen,
  );
  const setLoadingScreen = useScreenStore((state) => state.setLoadingScreen);
  const setCurrentLoadingScreen = useScreenStore(
    (state) => state.setCurrentLoadingScreen,
  );

  useEffect(()=>{
    window.electron.ipcRenderer.sendMessage('ipc-connect-db');
    setCurrentLoadingScreen("s");
    setLoadingScreen(true);
    //setTimeout(()=>{setLoadingScreen(false)},2000);
  },[])

  type Screen = {
    id: string;
    el: React.ReactNode;
  };

  const screens: Array<Screen> = [
    { id: 'U', el: <UpdateScreen /> },
    { id: 'F', el: <FilterScreen /> },
    { id: 'C', el: <CreateNewScreen /> },
  ];

  const cs: Screen = screens.filter((screen) => screen.id == currentScreen)[0];
  window.electron.ipcRenderer.on('ipc-response', (res) => {
    if (res) {
      window.success_insert_popup.showModal();
    } else {
      window.failed_insert_popup.showModal();
    }
  });

  window.electron.ipcRenderer.on('ipc-progress', (res, sc) => {
      setLoadingScreen(res);
      setCurrentLoadingScreen(sc);
  });



  return (
    <main className="App">
      <TitleBar />
      {loadingScreen && currentLoadingScreen == 's' ? (
        <StartingScreen />
      ) : (
        <>
          <Navbar />
          <section className="relative mt-[10vh] w-full bg-[#ebf2ff] min-h-[calc(100vh-(30px+10vh+4vh))] px-[4rem] py-[2rem]">
            {loadingScreen && currentLoadingScreen == 'l' ? (
              <LoadingScreen />
            ) : (
              <></>
            )}
            {cs.el}
          </section>
          <SuccessInsertPopup />
          <FailedInsertPopup />
        </>
      )}
      <Footer />
    </main>
  );
}
