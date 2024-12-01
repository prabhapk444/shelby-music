"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getLoveSong = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({  
    cookies: cookies
  });

  const { data, error } = await supabase
    .from('songs').select('*').eq('category','love')

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};




export default getLoveSong;