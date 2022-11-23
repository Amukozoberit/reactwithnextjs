import MeetUpDetail from "../../components/meetups/meetupDetail";
import {MongoClient,ObjectId} from 'mongodb';
import Head from 'next/head';
function MeetUpDetails(props) {
  
  return (
    <>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name="description" content={props.meetupData.description}/>
    </Head>
      <MeetUpDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
      />
    </>
  );
}

export async function getStaticPaths(){
  // const meetupId = context.params.meetupId;

  // console.log(meetupId);

   const client=await MongoClient.connect(
      "mongodb+srv://mwasheberit:github2122@cluster0.e1r0wp7.mongodb.net/?retryWrites=true&w=majority"
    ); 
    const db=client.db();
    const meetupsCollection=db.collection('meetups');
   const result=await  meetupsCollection.find({},{_id:1}).toArray();
  return {
    fallback:false,
       paths:result.map((meetup)=>({
        params:{meetupId:meetup._id.toString()},
       }))
  
}
 

}

export async function getStaticProps(context) {
  // fetch data for a single meetup
   const meetupId = context.params.meetupId;
   const client = await MongoClient.connect(
     "mongodb+srv://mwasheberit:github2122@cluster0.e1r0wp7.mongodb.net/?retryWrites=true&w=majority"
   );
   const db = client.db();
   const meetupsCollection = db.collection("meetups");
   const result = await meetupsCollection.findOne({_id:ObjectId(meetupId),});
 
  return {
    props: {
      meetupData: {
        id:result._id.toString(),
        title:result.title,
        address:result.address,
        image:result.image,
        description:result.description


      }
    },
  };
}
export default MeetUpDetails;
