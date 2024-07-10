import logo from '../../../assets/logo-without-bg.png';
import { useScreenStore } from '../stores/screen-store';

const Navbar: React.FC = () => {
  const setScreen = useScreenStore((state) => state.setScreen);
  const handleScreenChange = (screen: string) => {
    setScreen(screen);
  };

  return (
    <nav className="w-full h-[10vh] flex items-center justify-around bg-primary p-6 fixed top-[30px]">
      <div className="max-w-[10%] h-full min-w-[150px] flex items-center justify-center">
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="h-full w-[30%] h-full text-[#d5dce6]">
        <ul className="flex w-full h-full items-center justify-around text-[1rem] gap-2">
          <li
            className="w-[40%]  text-center  hover:scale-[1.1] hover:underline select-none transition duration-300 cursor-pointer"
            onClick={() => handleScreenChange('C')}
          >
            <button className="btn bg-info glass rounded-[1rem]">
              CREATE NEW
            </button>
          </li>
          <li
            className="w-[40%]  text-center  hover:scale-[1.1] hover:underline select-none transition duration-300 cursor-pointer"
            onClick={() => handleScreenChange('U')}
          >
            <button className="btn bg-info glass rounded-[1rem]">
              UPDATE PROGRESS
            </button>
          </li>
          <li
            className="w-[40%]  text-center  hover:scale-[1.1] hover:underline select-none transition duration-300 cursor-pointer"
            onClick={() => handleScreenChange('F')}
          >
            <button className="btn bg-info glass rounded-[1rem]">FILTER JOBS</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
