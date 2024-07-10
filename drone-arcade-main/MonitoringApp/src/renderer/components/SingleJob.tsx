import { Repair } from '../config/types';

type SingleJobProps = {
  r: Repair;
  setRepair: any;
};

const SingleJob = ({ r, setRepair }: SingleJobProps) => {
  return (
    <>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Branch : <span className="font-light text-black">{r?.branch}</span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Job Number : <span className="font-light text-black">{r?.jobNumber}</span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Order Taken Date :{' '}
          <span className="font-light text-black">{r?.date}</span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Change the Current Stage:
          <select
            className="w-[50%] font-light text-black bg-white-50 border border-gray-400 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            onChange={(e) => setRepair({ ...r, currentStage: e.target.value })}
            value={r?.currentStage}
          >
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
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Client Name :{' '}
          <span className="font-light text-black">
            {r?.firstName + ' ' + r?.lastName}
          </span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Address : <span className="font-light text-black">{r?.address}</span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Phone : <span className="font-light text-black">{r?.phone}</span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Drone Modal :{' '}
          <span className="font-light text-black">{r?.modal}</span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          CAASL Number :{' '}
          <span className="font-light text-black">{r?.caasl}</span>
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Serial Numbers :{' '}
          {Object.entries(r?.serialNumbers).map(([k, v], index) => {
            return (
              <div className="py-1 text-sm" key={index}>
                <p className="font-bold text-gray-400">
                  <span className="mr-1">•</span>
                  {k.toUpperCase()} :{' '}
                  <span className="font-light text-black">{v}</span>
                </p>
              </div>
            );
          })}
        </p>
      </div>
      <div className="py-1">
        <p className="font-bold text-gray-400">
          <span className="mr-1">•</span>
          Accessories : <span>{''}</span>
          {Object.entries(r?.accessories).map(([k, v], index) => {
            return (
              <div className="py-1" key={index}>
                <p className="font-bold text-gray-400 text-sm">
                  <span className="mr-1">•</span>
                  {k.toUpperCase()} :{' '}
                  <span>
                    {v === true ? (
                      <span className="text-success">✓</span>
                    ) : (
                      <span className="text-error">✗</span>
                    )}
                  </span>
                </p>
              </div>
            );
          })}
        </p>
      </div>
      <div className="py-1">
        <div className="flex flex-col items-start justify-start">
          Description :
          <textarea
            className="w-[50%] bg-white-50 border border-gray-400 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none focus:border-blue-500"
            value={r?.description}
            onChange={(e) => setRepair({ ...r, description: e.target.value })}
          />
        </div>
      </div>
    </>
  );
};

export default SingleJob;
