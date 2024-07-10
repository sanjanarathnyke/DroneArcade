import { Repair } from '../config/types';
import { create } from 'zustand';

type RepairState = {
  repair: Repair;
  repairArr: Repair[];
  setRepair: (r: Repair) => void;
  setRepairArr: (r: Repair[]) => void;
};

export const initialState: Repair = {
  branch: '',
  jobNumber: '',
  firstName: '',
  lastName: '',
  modal: '',
  currentStage: 'Inspection Fee Paid',
};

export const useRepairStore = create<RepairState>()((set) => ({
  repair: initialState,
  repairArr: [],
  setRepair: (r) => set(() => ({ repair: r })),
  setRepairArr: (r) => set(() => ({ repairArr: r })),
}));

/*
 {
    branch : "",
    jobNumber : "",
    firstName : "",
    lastName : "",
    nic : "",
    address :"",
    phone : "",
    modal : "",
    caasl : "",
    serialNumbers : {
        aircraft : "",
        remote : "",
        camera : "",
        charger : "",
        battery1 : "",
        battery2 : "",
        battery3 : "",
        battery4 : ""
    },
    accessories : {
        aircraft : false,
        remote : false,
        camera : false,
        charger : false,
        powerCable : false,
        dataCable : false,
        carCharger : false,
        memoryCard : false,
        manuals : false,
        carryCase : false,
        propellarGuards : false,
        gimbalLocks : false,
        battery : false,
        chargingHub : false
    },
    description : "",
    currentStage : ""
  }

  */
