import { youtube_v3 } from "googleapis";

export const correctImage = (
    thumbnails : youtube_v3.Schema$ThumbnailDetails,
    playlistItemThumbnail: youtube_v3.Schema$ThumbnailDetails,
    fromSearch: string | null,
) => {
    if(!fromSearch || !playlistItemThumbnail){
        if(thumbnails.maxres) return thumbnails.maxres.url;

        if(thumbnails.standard) return thumbnails.standard.url;

        if(thumbnails.high?.url) return thumbnails.high.url;

        if(thumbnails.medium?.url) return thumbnails.medium.url;

        return thumbnails.default?.url ?? "";
    }

    if(playlistItemThumbnail.maxres) return playlistItemThumbnail.maxres.url;

    if(playlistItemThumbnail.standard) return playlistItemThumbnail.standard.url;

    if(playlistItemThumbnail.high?.url) return playlistItemThumbnail.high.url;

    if(playlistItemThumbnail.medium?.url) return playlistItemThumbnail.medium.url;

    return playlistItemThumbnail.default?.url ?? "";
}