'use client'
import { youtube_v3 } from "googleapis";
import { createContext, useContext, useState } from "react";
import { generateNewPlaylist, searchYoutube } from "../actions/youtube.action";
import { useRouter } from "next/navigation";




type initialProps = {
    searchValue : string,
    handleSearchValue: (value : string) => void,
    searchResult: () => void,
    result: youtube_v3.Schema$SearchListResponse | null,
    isLoading: boolean,
    handleNewPlaylist: (songID : string, name : string) => void,
}

const SearchContext = createContext<null | initialProps>(null);


export const SearchProvider = ({
    children
} : {
    children : React.ReactNode
}) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>("");
    const [result, setResult] = useState<youtube_v3.Schema$SearchListResponse | null>(null);
    const [isLoading, setLoading] = useState(false);

    const handleSearchValue = async (value : string) => setSearchValue(value);

    const searchResult = async () => {
        setLoading(true);
        router.push('/search');
        const res = await searchYoutube(searchValue);
        setResult(res);
        setLoading(false);
    }

    const handleNewPlaylist = async (songID: string, songName: string) => {
        let stripSongName = songName;
        stripSongName.replace('(Official Audio)', '');
        stripSongName.replace('(Official Lyric Video)', '');
        stripSongName.replace('(Official Music Video)', '');

        const params = new URLSearchParams({
            name: `Related to: ${songName}`,
            fromSearch: 'true',
        })

        router.push(`/playlist/RD${songID}?${params}`);
    }

    const values = {
        searchValue,
        handleSearchValue,
        result,
        isLoading,
        searchResult,
        handleNewPlaylist
    }

    return(
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    )

}

export const useSearchContext = () => {
    const context = useContext(SearchContext);

    if(context === null) throw new Error('Have to use within the search context');

    return context;
}