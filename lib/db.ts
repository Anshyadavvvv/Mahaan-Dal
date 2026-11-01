import mongoose from 'mongoose';
const cache=(globalThis as typeof globalThis & {mongoose?:{conn:typeof mongoose|null;promise:Promise<typeof mongoose>|null}}).mongoose??{conn:null,promise:null};
export async function connectDB(){
  const uri=process.env.MONGODB_URI;
  if(!uri) throw new Error('MONGODB_URI is required');
  if(cache.conn)return cache.conn;
  if(!cache.promise)cache.promise=mongoose.connect(uri).then(m=>m);
  cache.conn=await cache.promise;
  (globalThis as typeof globalThis & {mongoose?:typeof cache}).mongoose=cache;
  return cache.conn;
}
