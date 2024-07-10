import { FailedInsertPopup, SuccessInsertPopup } from './Popups';
import SingleJob from './SingleJob';
import { useRepairStore, initialState } from '../stores/repair-store';
import { useState } from 'react';
import { Repair } from '../config/types';

const UpdateScreen = () => {
  const [updatedRepair, setUpdatedRepair] = useState<Repair>(initialState);
  const [num, setNum] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNum(e.target.value);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.electron.ipcRenderer.sendMessage('ipc-update-data', updatedRepair);
  };
  window.electron.ipcRenderer.on('ipc-got-job-by-number', (r: Repair) => {
    if (!r.date) {
      window.failed_insert_popup.showModal();
      return;
    } else {
      setUpdatedRepair(r);
    }
  });

  const getJobByJobNumber = (): void => {
    if (num == '') return;
    window.electron.ipcRenderer.sendMessage('ipc-get-job-by-number', num);
  };

  return (
    <div>
      <span>•</span>
      <label className="text-start font-bold whitespace-nowrap ml-[1rem]">
        Enter the Job Number :{' '}
      </label>
      <div className="w-full flex items-center justify-start gap-4">
        <input
          className="w-50% bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
          onChange={(e) => handleInput(e)}
          value={num}
        />
        <button
          className="btn w-[10rem] btn-accent rounded-lg"
          onClick={getJobByJobNumber}
        >
          Find
        </button>
      </div>
      <div className="text-lg w-full h-full border-dashed rounded-lg border-2 border-gray-500 my-[1rem] p-1">
        {updatedRepair.date != '' ? (
          <SingleJob r={updatedRepair} setRepair={setUpdatedRepair} />
        ) : (
          <></>
        )}

        <button
          className="btn w-[10rem] btn-primary my-[1rem] rounded-lg"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateScreen;
