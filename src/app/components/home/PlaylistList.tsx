import { youtube_v3 } from "googleapis";
import Link from "next/link";
import { IoAccessibilityOutline } from "react-icons/io5";


export default function PlaylistList(
    {
        list,
        genre
    }: {
        list: youtube_v3.Schema$PlaylistListResponse | null,
        genre: youtube_v3.Schema$PlaylistListResponse | null,
    }
) {
    const returnCorrectImage = (playlist: youtube_v3.Schema$Playlist) => {
        const imageWidth = playlist.snippet?.thumbnails?.maxres?.width;
        const imageLength = playlist.snippet?.thumbnails?.maxres?.height;

        if (imageLength === imageWidth) {
            return (
                <div className="mx-auto overflow-hidden w-[400px] h-[400px] m-4 mb-1 rounded-xl relative">
                    <Link href={`/playlist/${playlist.id}?name=${playlist.snippet?.title}`}>
                        <img
                            className="w-full cursor-pointer"
                            src={
                                (playlist.snippet?.thumbnails?.maxres) ?
                                    playlist.snippet.thumbnails.maxres.url as string : playlist.snippet?.thumbnails?.standard?.url as string
                            }
                        />
                    </Link>
                </div>
            )
        }
        return (
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
        )
    }



    return (
        list &&
        <div className="w-full flex flex-col pb-10">
            <div className="px-5 py-10">
                <div>
                    <h1 className="text-7xl font-medium">Mixes</h1>
                </div>
                <div className="flex overflow-y-auto no-scrollbar relative">
                    {genre?.items?.map((playlist) => (
                        <div className="flex flex-col mx-5" key={playlist.id as string}>
                            {returnCorrectImage(playlist)}
                            <div className="m-auto">
                                <p>{playlist.snippet?.title}</p>
                            </div>
                        </div>
                    ))}
                    <div className="">
                        <IoAccessibilityOutline size={35}/>
                    </div>
                </div>
            </div>
            <div className="px-5 py-10">
                <div>
                    <h1 className="font-medium text-7xl">Your Playlists</h1>
                </div>
                <div className="flex overflow-y-auto no-scrollbar">
                    {list?.items?.map((playlist) => (
                        <div className="flex flex-col mx-5" key={playlist.id as string}>
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
            </div>
        </div>
    )

}