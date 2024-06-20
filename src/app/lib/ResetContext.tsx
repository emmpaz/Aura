import { useSongContext } from "./SongContextProvider"
import { useSongProgressContext } from "./SongProgressProvider";




export const resetContexts = () => {
    const {
        resetSongContext
    } = useSongContext();

    const {
        resetSongProgressContext
    } = useSongProgressContext();

    resetSongContext();
    resetSongProgressContext();
}