import { MongoClient } from "mongodb";
// api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
   const client=await MongoClient.connect(
      "mongodb+srv://mwasheberit:github2122@cluster0.e1r0wp7.mongodb.net/?retryWrites=true&w=majority"
    ); 
    const db=client.db();
    const meetupsCollection=db.collection('meetups');
   const result=await  meetupsCollection.insertOne(data);

   console.log(result);

   client.close();

   res.status(201).json({message:'Meetup inserted'});
}
}

export default handler;
