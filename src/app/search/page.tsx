'use server'
import { hasYouTubeTokenANDValid } from "../actions/youtube.action";
import Navigation from "../components/Common/Nav";
import BottomPlayer from "../components/Players/BottomPlayer";
import SearchResult from "../components/SearchResults/searchResult";



export default async function Page(){

    const isLinked = await hasYouTubeTokenANDValid();
    
    return(
        <div className="min-h-screen w-full bg-[#3B4131] flex flex-col">
            <Navigation isLinked={isLinked}/>
            <SearchResult/>
            <BottomPlayer/>
        </div>
    )
}