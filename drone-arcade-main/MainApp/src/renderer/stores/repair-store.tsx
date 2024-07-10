import {Repair} from '../config/types'
import {create} from 'zustand'

type RepairState = {
  repair:Repair,
  repairArr:Repair[],
  setRepair:(r:Repair)=>void,
  setRepairArr:(r:Repair[])=>void
}
let n:any="000";
window.electron.ipcRenderer.sendMessage('ipc-get-last-jobNumber',[]);
window.electron.ipcRenderer.on('ipc-got-last-jobNumber',(x)=>{
  n = x;
})

export const initialState:Repair={
    branch : "",
    jobNumber : n,
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
        propellers:false,
        battery : false,
        chargingHub : false
    },
    description : "",
    currentStage : "Inspection Fee Paid",
    date:""
}

export const useRepairStore = create<RepairState>()((set)=>({
  repair:initialState,
  repairArr:[],
  setRepair:(r)=>set(()=>({repair:r})),
  setRepairArr:(r)=>set(()=>({repairArr:r}))
}))




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
