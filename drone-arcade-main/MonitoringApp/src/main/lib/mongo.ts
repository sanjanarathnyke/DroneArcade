import { MongoClient,ServerApiVersion } from "mongodb";
import log from 'electron-log';

const uri:string = "mongodb+srv://admin:pwNbU5uZoQ5SHVou@dronedb.cjoykko.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(uri,{
  serverApi:{
    version:ServerApiVersion.v1,
    strict:true,
    deprecationErrors:true
  }
})


export async function connectDB(){
  try{
    await client.connect();
    await client.db('admin').command({ping:1});
    log.info('Database Connection Established.');
  }catch(ex){
    log.info(ex);
  }
}
