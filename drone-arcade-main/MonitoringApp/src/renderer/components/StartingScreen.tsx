import logo from '../../../assets/logo-without-bg.png';
import coverimage from '../../../assets/cover-image.png'

const StartingScreen = () => {
  return (
    <div className="bg-white opacity-[75%] w-[100vw] h-[90vh] relative">
      <div role="status" className="z-50 flex flex-col items-center justify-center h-full">
        <div className="bg-white rounded-[1rem] p-[1rem]">
          <img src={logo} alt="Company Logo" className="w-[60vw]" />
          <progress className="progress progress-primary h-1 w-full" />
          <p className="mt-[4px] text-center w-[100%]">
            Loading....Please Wait...
          </p>
        </div>
      </div>
      <img src={coverimage} className = "absolute w-full h-[97vh] inset-0 -z-50"/>
      <div className="absolute w-full -z-50 h-[97vh] bg-black inset-0 opacity-[90%]"></div>
    </div>
  );
};

export default StartingScreen;
