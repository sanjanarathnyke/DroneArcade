import { ObjectId } from 'mongodb';

export interface Repair {
  branch: string;
  jobNumber: string;
  firstName: string;
  lastName: string;
  modal: string;
  currentStage: string;
}
