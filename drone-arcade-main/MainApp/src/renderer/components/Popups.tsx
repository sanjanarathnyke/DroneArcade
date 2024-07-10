import { Repair } from '../config/types';
import { useRepairStore } from '../stores/repair-store';

export function FailedInsertPopup() {
  return (
    <div>
      <dialog id="failed_insert_popup" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Warning!</h3>
          <p className="py-4">
            Something Went Wrong. Please Try again.
          </p>
          <p className="text-xs text-gray-700">
            *Make sure you got internet connection.
            If the error persists, Please contact the developer.
          </p>
          <div className="modal-action">
            <button className="btn btn-error rounded-[1rem] hover:scale-110">OK</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
export function MongoFailedPopup() {
  return (
    <div>
      <dialog id="mongo_failed_popup" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Warning!</h3>
          <p className="py-4">
            Couldn't Connect to Database. Please Try again.
          </p>
          <p className="text-xs text-gray-700">
            *Make sure you got internet connection.
            If the error persists, Please contact the developer.
          </p>
          <div className="modal-action">
            <button className="btn btn-error rounded-[1rem] hover:scale-110">OK</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export function SuccessInsertPopup() {
  return (
    <div>
      <dialog id="success_insert_popup" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-lime-600">Success!</h3>
          <p className="py-4">Process Completed.</p>
          <div className="modal-action">
            <button className="btn btn-success rounded-[1rem] hover:scale-110">OK</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

type PreviewPopupProps = {
  f: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function PreviewPopup({ f }: PreviewPopupProps) {
  const { repair } = useRepairStore();
  return (
    <div>
      <dialog id="preview_popup" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-success">
            Please Confirm the Record.
          </h3>
          {Object.entries(repair).map(([key, value], index) => {
            return (
              <div
                className="text-sm w-100 flex justify-start align-center gap-2"
                key={index}
              >
                <h3 className="font-bold">{key.toUpperCase()} : </h3>
                <div>
                  {typeof value === 'object'
                    ? Object.entries(value).map(([k, v], index) => {
                        return (
                          <div
                            className="text-sm w-100 flex justify-start align-center gap-2"
                            key={index}
                          >
                            <h3 className="font-bold text-gray-500">{k.toUpperCase()} : </h3>
                            <p>{typeof v==='boolean' ? v===true ? <span className="text-success">✓</span>:<span className="text-error">✗</span> :v}</p>
                          </div>
                        );
                      })
                    : value}
                </div>
              </div>
            );
          })}
          <div className="modal-action">
            <button className="btn btn-error rounded-[1rem] hover:scale-110">Cancel</button>
            <button className="btn btn-success rounded-[1rem] hover:scale-110" onClick={f}>Confirm</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
