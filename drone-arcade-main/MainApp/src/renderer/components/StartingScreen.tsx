import logo from '../../../assets/logo-without-bg.png';

const StartingScreen = () => {
  return (
    <div className="bg-white opacity-[75%] w-[100vw] h-[90vh]">
      <div role="status" className="flex flex-col items-center justify-center h-full">
        <div >
          <img src={logo} alt="Company Logo" className="w-[60vw]" />
          <progress className="progress progress-primary h-1 w-full" />
          <p className="mt-[4px] text-center w-[100%]">
            Loading....Please Wait...
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartingScreen;
