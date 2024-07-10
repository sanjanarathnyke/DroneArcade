import { ObjectId } from "mongodb"

export interface Repair{
  _id?:typeof ObjectId,
  branch:string,
  jobNumber:string,
  firstName:string,
  lastName:string,
  nic:string,
  address:string,
  phone:string,
  modal:string,
  caasl:string,
  currentStage:string,
  serialNumbers:{
        aircraft:string,
        remote:string,
        camera:string,
        charger:string,
        battery1:string,
        battery2:string,
        battery3:string,
        battery4:string
    },
  accessories:{
        aircraft:boolean,
        remote:boolean,
        camera:boolean,
        charger:boolean,
        powerCable:boolean,
        dataCable:boolean,
        carCharger:boolean,
        memoryCard:boolean,
        manuals:boolean,
        carryCase:boolean,
        propellarGuards:boolean,
        gimbalLocks:boolean,
        propellers:boolean,
        battery:boolean,
        chargingHub:boolean
    },
  description:string,
  date:string,
}
