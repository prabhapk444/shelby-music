"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player =()=>{
   
    const player =usePlayer();
    
    const  {song }= useGetSongById(player.activeId);

      const songurl =useLoadSongUrl(song!);


      if (!song || !songurl ||  !player.activeId){
        return null;
      }


    return (
        <div  className="fixed bottom-6 bg-black w-full py-2 h-[80px] px-4">
          <PlayerContent key={songurl}  song ={song} songUrl= {songurl}/>
        </div>
    )
}

export default Player;