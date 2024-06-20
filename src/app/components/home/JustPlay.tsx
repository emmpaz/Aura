'use client'
import { FaPlay } from "react-icons/fa";

import { motion } from "framer-motion";
import { getCurrentPlaylist } from "@/app/actions/playlistSchedule.action";
import { getScheduleFromMetaData } from "@/app/actions/auth0.action";
import { useRouter } from "next/navigation";

export default function JustPlay(){

    const router = useRouter();


    const handleJustPlay = async () => {
        const schedule = await getScheduleFromMetaData();
        if(!schedule) {
            router.push('/playlist-schedule');
            return;
        }
        const getPlaylist = await getCurrentPlaylist(schedule);
    }


    return(
        <div className="w-full flex justify-center flex-1 my-10">
            <motion.button
                whileHover={{
                    scale: 1.04,
                    transition: {duration: .2}
                }}
                whileTap={{scale: .95}}
                onClick={handleJustPlay}
            >
                <FaPlay size={300} color="#FFF6DB" className=" cursor-pointer transition-all ease-in-out"/>
            </motion.button>
                
        </div>
    )
}