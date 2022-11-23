import {MongoClient} from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Layout from '../components/layout/Layout';
import { useEffect,useState } from 'react';
import Head from 'next/Head';


const DUMMY_MEETUPS=[{
    id:'m1',
    title:'@A first meetup',
    image:'https://source.unsplash.com/user/c_v_r',
    address:'some address 5,12345 Some city',
    description:'This is first Meetup',
},
{
    id:'m2',
    title:'@A first meetup',
    image:'https://source.unsplash.com/user/c_v_r',
    address:'some address 5,12345 Some city',
    description:'This is a second  Meetup',
}
];

function HomePage(props){
    // const [loadedMeetuos,setloadedMeetups]=useState([]);
    // useEffect(() => {
    //     setloadedMeetups(DUMMY_MEETUPS);
    // }, []);
    return (
      <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active react meetups"/>
      </Head>
        <MeetupList meetups={props.meetups} />
      </>
    );
}


export async  function getStaticProps(){
    // fetch data from api/file systems
    // fast can be cached and reused.
    //#endregion

    const client = await MongoClient.connect(
      "mongodb+srv://mwasheberit:github2122@cluster0.e1r0wp7.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.find().toArray();
    client.close()
    return {
        props:{
            meetups:result.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            }))
        },
        revalidate:1
        // features changes every 10 seconds
    };
}

// export async function getServerSideProps(){
//     const req=context.req;
//     const res=context.res;
//     // runs on every second,
//     // fetch data from file system-code in c
//     return {props:{
//         meetups:DUMMY_MEETUPS
//     }};
// }

export default HomePage 