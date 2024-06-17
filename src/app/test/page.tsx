'use server'
import { hasYouTubeTokenANDValid } from "../actions/youtube.action";
import Navigation from "../components/Common/Nav";



export default async function Page(){

    const isLinked = await hasYouTubeTokenANDValid();
    
    return(
        <div>
            <Navigation isLinked={isLinked}/>
        </div>
    )
}