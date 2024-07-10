export type ACCESSORY = {
    name: string;
    x:string;
    count?: number;
  };
export const ACCESSORY_LIST: ACCESSORY[] = [
    {
      name: 'Aircraft',
      x: 'aircraft',
    },
    {
      name: 'Remote',
      x:'remote'
    },
    {
      name: 'Camera',
      x:'camera'
    },
    {
      name: 'Charger',
      x:'charger'
    },
    {
      name: 'Power Cable',
      x:'powerCable'
    },
    {
      name: 'Data Cable',
      x:'dataCable'
    },
    {
      name: 'Car Charger',
      x:'carCharger'
    },
    {
      name: 'Memory Card',
      x:'memoryCard'
    },
    {
      name: 'Manuals',
      x:'manuals'
    },
    {
      name: 'Carry Case',
      x:'carryCase'
    },
    {
      name: 'Propeller Guards',
      x:'propellarGuards'
    },
    {
      name: 'Gimbal Locks',
      x:'gimbalLocks'
    },
    {
      name: 'Propellers',
      x:'propellers'
    },
    {
      name: 'Battery',
      x:'battery'
    },
    {
      name: 'Charging Hub',
      x:'chargingHub'
    },
  ];


export type Repair={
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
  description:string
  date:string
}
