import { getList, hasYouTubeTokenANDValid } from "@/app/actions/youtube.action";
import MusicList from "@/app/components/playlist/MusicList";
import Navigation from "@/app/components/home/Nav";
import LinkYoutubeButton from "@/app/components/home/YouTubeLink";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Page({params} : {params : {id : string}}) {

    const {id} = params;
    if(!id) {
        return (
            <div className="min-h-screen w-full bg-[#3B4131] flex justify-center items-center">
                <p>no playlist selected...</p>
            </div>
        )
    }

    const list = await getList(id);
    const session = await getSession();
    const isLinked = await hasYouTubeTokenANDValid();
    
    return (
      <div className="min-h-screen w-full bg-[#3B4131]">
        <Navigation isLinked={isLinked}/>
        <MusicList username={session?.user.name} musicList={list}/>
      </div>
    )
  }