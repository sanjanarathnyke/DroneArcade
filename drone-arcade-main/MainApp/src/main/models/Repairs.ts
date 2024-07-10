const { MongoClient } = require('mongodb');
import { client } from '../lib/mongo';
import { Repair } from '../lib/typeDefinitions';

export class Repairs {
  DB_NAME: string = 'repairDb';
  client: typeof MongoClient = client;

  #getCollection = async () => {
    await this.client.connect();
    const db = this.client.db(this.DB_NAME);
    const repairs = db.collection('repairs');
    return repairs;
  };

  getAllRepairs = async (): Promise<Repair[]> => {
    const repairs = await this.#getCollection();
    let res = await repairs.find({}).toArray();
    const r: Repair[] = res.map((rep: any) => {
      const { _id, ...rest } = rep;
      return rest;
    });
    return r;
  };

  insertRepair = async (repair: Repair) => {
    const repairs = await this.#getCollection();
    let date = new Date().toString();
    date = date.slice(0, 25);
    repair = { ...repair, date: date };
    let res = await repairs.insertOne(repair);
  };

  updateRepair = async (repair: Repair) => {
    const repairs = await this.#getCollection();
    let res = await repairs.updateOne(
      { jobNumber: repair.jobNumber },
      {
        $set: {
          currentStage: repair.currentStage,
          description: repair.description,
        },
      },
      false,
      false,
    );
  };

  getLastJobNumber = async (): Promise<String> => {
    const repairs = await this.#getCollection();
    let res = await repairs.find({}).sort({ _id: -1 }).toArray();
    let n = res[0].jobNumber;
    return n;
  };

  getJobByJobNumber = async (n: Number): Promise<Repair> => {
    const repairs = await this.#getCollection();
    let res = await repairs.findOne({ jobNumber: `${n}` });
    return res;
  };

  getJobsByStage = async (c: String): Promise<Repair[]> => {
    const repairs = await this.#getCollection();
    let res = await repairs
      .find({ currentStage: `${c}` })
      .sort({ _id: -1 })
      .toArray();
    const r: Repair[] = res.map((rep: any) => {
      const { _id, ...rest } = rep;
      return rest;
    });
    console.log(r);
    return r;
  };
}
