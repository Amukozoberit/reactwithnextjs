import {useRouter} from 'next/router';
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
function NewMeetupPage(){

    const router=useRouter();
   async function addMeetupHandler(enteredMeetUpData){
        console.log(enteredMeetUpData);
        const response=await fetch('/api/new-meetup',{
            method:'POST',body:JSON.stringify(enteredMeetUpData),headers:{
                'Content-Type':'application/json'
            }

        });
        const data=await response.json();
        console.log(data);
        router.push('/')
    }
     return (
       <>
         <Head>
           <title>New Meetups</title>
           <meta
             name="description"
             content="Amazing networking opportunities"
           />
         </Head>
         <NewMeetupForm onAddMeetup={addMeetupHandler} />;
       </>
     );
  
}

export default NewMeetupPage