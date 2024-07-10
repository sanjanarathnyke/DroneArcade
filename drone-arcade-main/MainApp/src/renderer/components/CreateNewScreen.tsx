import {useEffect} from 'react';
import { ACCESSORY_LIST } from '../config/types';
import { useRepairStore, initialState } from '../stores/repair-store';
import { FailedInsertPopup, PreviewPopup, SuccessInsertPopup } from './Popups';

const CreateNewScreen: React.FC = () => {
  const { repair, setRepair } = useRepairStore();

  useEffect(()=>{
   window.electron.ipcRenderer.sendMessage('ipc-get-last-jobNumber');
  },[])
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) => {
    setRepair({ ...repair, [inputName]: e.target.value });
  };
  const handleDropdown = (
    e: React.ChangeEvent<HTMLSelectElement>,
    inputName: string,
  ) => {
    setRepair({ ...repair, [inputName]: e.target.value });
  };

  const handleSerial = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) => {
    setRepair({
      ...repair,
      serialNumbers: { ...repair.serialNumbers, [inputName]: e.target.value },
    });
  };

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) => {
    setRepair({
      ...repair,
      accessories: { ...repair.accessories, [inputName]: e.target.checked },
    });
  };

  window.electron.ipcRenderer.on('ipc-got-last-jobNumber', (n) => {
    setRepair({
      ...repair,
      jobNumber: (Number(n)+1).toString(),
    });
    return;
  });

  window.electron.ipcRenderer.on('ipc-response', (a) => {
    window.preview_popup.close();
    if (a) {
      setRepair(initialState);
      window.electron.ipcRenderer.sendMessage('ipc-get-last-jobNumber');
    } else {
    }
    return;
  });

  const createNew = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.electron.ipcRenderer.sendMessage('ipc-insert-data', repair);
  };

  return (
    <div>
      <PreviewPopup f={createNew} />
      <form>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            Branch
          </label>
          <span className="font-bold">:</span>
          <select
            id="branches"
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleDropdown(e, 'branch')}
            value={repair.branch}
          >
            <option defaultValue="">Choose a Branch</option>
            <option value="Kandy">Kandy</option>
            <option value="Colombo">Colombo</option>
          </select>
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            Job Number :{' '}
          </label>
          <span>{repair.jobNumber}</span>
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            First Name{' '}
          </label>
          <span className="font-bold">:</span>
          <input
            type="text"
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleInput(e, 'firstName')}
            value={repair.firstName}
          />
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            Last Name
          </label>
          <span className="font-bold">:</span>
          <input
            type="text"
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleInput(e, 'lastName')}
            value={repair.lastName}
          />
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            National Identity Card{' '}
          </label>
          <span className="font-bold">:</span>
          <input
            type="text"
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleInput(e, 'nic')}
            value={repair.nic}
          />
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            Address{' '}
          </label>
          <span className="font-bold">:</span>
          <input
            type="text"
            value={repair.address}
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleInput(e, 'address')}
          />
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            Phone{' '}
          </label>
          <span className="font-bold">:</span>
          <input
            type="text"
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleInput(e, 'phone')}
            value={repair.phone}
          />
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            Drone Modal
          </label>
          <span className="font-bold">:</span>
          <input
            type="text"
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => handleInput(e, 'modal')}
            value={repair.modal}
          />
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            CAASL Reg. No
          </label>
          <span className="font-bold">:</span>
          <input
            onChange={(e) => handleInput(e, 'caasl')}
            value={repair.caasl}
            type="text"
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2 mb-[1rem] flex-1">
            <span>•</span>
            <label className="text-start font-bold whitespace-nowrap">
              Serial Numbers{' '}
            </label>
            <span className="font-bold">:</span>
            <div className="min-w-[200px] ">
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Aircraft
                </label>
                <span className="font-bold">:</span>
                <input
                  type="text"
                  value={repair.serialNumbers.aircraft}
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleSerial(e, 'aircraft')}
                />
              </div>
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Remote
                </label>
                <span className="font-bold">:</span>
                <input
                  value={repair.serialNumbers.remote}
                  type="text"
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleSerial(e, 'remote')}
                />
              </div>
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Camera
                </label>
                <span className="font-bold">:</span>
                <input
                  type="text"
                  value={repair.serialNumbers.camera}
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleSerial(e, 'camera')}
                />
              </div>
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Charger
                </label>
                <span className="font-bold">:</span>
                <input
                  type="text"
                  value={repair.serialNumbers.charger}
                  onChange={(e) => handleSerial(e, 'charger')}
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="min-w-[200px] ">
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Battery 1
                </label>
                <span className="font-bold">:</span>
                <input
                  type="text"
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                  value={repair.serialNumbers.battery1}
                  onChange={(e) => handleSerial(e, 'battery1')}
                />
              </div>
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Battery 2
                </label>
                <span className="font-bold">:</span>
                <input
                  type="text"
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleSerial(e, 'battery2')}
                  value={repair.serialNumbers.battery2}
                />
              </div>
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Battery 3
                </label>
                <span className="font-bold">:</span>
                <input
                  type="text"
                  value={repair.serialNumbers.battery3}
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleSerial(e, 'battery3')}
                />
              </div>
              <div className="flex items-center justify-start gap-2 mb-[1rem]  mt-[1rem]">
                <label className="text-start font-bold whitespace-nowrap">
                  Battery 4
                </label>
                <span className="font-bold">:</span>
                <input
                  type="text"
                  className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
                  value={repair.serialNumbers.battery4}
                  onChange={(e) => handleSerial(e, 'battery4')}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 mb-[1rem] flex-2 ml-4">
            <span>•</span>
            <label className="text-start font-bold whitespace-nowrap">
              Accessories{' '}
            </label>
            <span className="font-bold">:</span>
            <div className="flex gap-4 flex-wrap">
              {ACCESSORY_LIST.map((ac) => (
                <div key={ac.x} className="flex w-[200px] items-center justify-between gap-3">
                  <label className=" text-start font-bold whitespace-nowrap">
                    {ac.name}
                  </label>
                  <div>
                    <input
                      className="mr-[0.5rem]"
                      type="checkbox"
                      id={ac.name}
                      name={ac.name}
                      onChange={(e) => handleCheck(e, ac.x)}
                    />
                    <span>||</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start gap-2 mb-[1rem]">
          <span>•</span>
          <label className="text-start font-bold whitespace-nowrap">
            Description
          </label>
          <span className="font-bold">:</span>
          <input
            type="text"
            value={repair.description}
            onChange={(e) => handleInput(e, 'description')}
            className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
      </form>
      <button
        className="btn btn-wide btn-success rounded-[1rem] hover:scale-110"
        onClick={() => window.preview_popup.showModal()}
      >
        Create New Job
      </button>
    </div>
  );
};

export default CreateNewScreen;
