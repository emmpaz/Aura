import { youtube_v3 } from "googleapis";
import Link from "next/link";


export default function PlaylistList(
    {
        list
    }: {
        list: youtube_v3.Schema$PlaylistListResponse | null
    }
) {

    return (
        list && 
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 pb-10">
            {list?.items?.map((playlist) => (
                <div className="flex flex-col" key={playlist.id as string}>
                    <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 mb-1 rounded-xl relative">
                        <Link href={`/playlist/${playlist.id}?name=${playlist.snippet?.title}`}>
                            <img
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[707px] max-w-none cursor-pointer"
                                src={
                                    (playlist.snippet?.thumbnails?.maxres) ? 
                                        playlist.snippet.thumbnails.maxres.url as string : playlist.snippet?.thumbnails?.standard?.url as string
                                    }
                            />
                        </Link>
                    </div>
                    <div className="m-auto">
                        <p>{playlist.snippet?.title}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}