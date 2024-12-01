import { Song } from "@/types";

import {  useSupabaseClient} from "@supabase/auth-helpers-react";

const useLoadsongurl = (song:Song) =>{
    const SupabaseClient = useSupabaseClient();

    if (!song ){
        return '';
    }

    const {data :songData} = SupabaseClient
            .storage
            .from('songs')
            .getPublicUrl(song.song_path)
            return songData.publicUrl
                  

}

export default  useLoadsongurl;