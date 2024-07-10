import { useRepairStore } from '../stores/repair-store';
import { Repair } from '../config/types';

const FilterScreen = () => {
  const { repair, repairArr, setRepair, setRepairArr } = useRepairStore();

  window.electron.ipcRenderer.on('ipc-got-jobs-by-stage',(r:Repair[])=>{
    setRepairArr(r);
  })

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    window.electron.ipcRenderer.sendMessage('ipc-get-jobs-by-stage',e.target.value);
  }

  return (
    <>
      <div>
        <span>•</span>
        <label className="text-start font-bold whitespace-nowrap ml-[1rem]">
          Select The Stage :{' '}
        </label>
        <div className="py-1 flex gap-2">
          <select className="w-[50%] bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500" onChange={handleChange}>
            <option >---------------------</option>
            <option value="Inspection Fee Paid">Inspection Fee Paid</option>
            <option value="In the Inspection">In the Inspection</option>
            <option value="Inspection Done">Inspection Done</option>
            <option value="Quotation Sent">Quotation Sent</option>
            <option value="Full Payment Recieved">Full Payment Recieved</option>
            <option value="Parts Ordered">Parts Ordered</option>
            <option value="Repair Complete">Repair Complete</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        {
          repairArr?.map((r,index)=>{
            return(
        <div className="text-md w-full h-full border-dashed rounded-lg border-2 border-gray-500 my-[1rem] p-1" key={index}>
                <Item r={r}/>

        </div>
            )
        })
        }
      </div>
    </>
  );
};

type itemProp = {
  r:Repair
}

const Item = ({r}:itemProp) => {
  return (
    <>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Job Number : <span className="font-light text-black">{r.jobNumber}</span>
        </p>
      </div>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Order Taken Date : <span className="font-light text-black">{r.date}</span>
        </p>
      </div>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Current Stage : <span className="font-light text-black">{r.currentStage}</span>
        </p>
      </div>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Client Name : <span className="font-light text-black">{r.firstName + " " + r.lastName}</span>
        </p>
      </div>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Phone : <span className="font-light text-black">{r.phone}</span>
        </p>
      </div>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Drone Modal : <span className="font-light text-black">{r.modal}</span>
        </p>
      </div>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          CAASL Number : <span className="font-light text-black">{r.caasl}</span>
        </p>
      </div>
      <div >
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Description : <span className="font-light text-black">{r.description}</span>
        </p>
      </div>
    </>
  );
};

export default FilterScreen;
