"use client";
import Header from '@/Components/Header';
import ListItem from '@/Components/ListItem';
import getSisterSong from '@/actions/getSisterSong';
import getSongs from '@/actions/getSongs';
import getLoveSong from '@/actions/getLoveSong';
import { useEffect, useState } from 'react';
import getSadSong from '@/actions/getSadSong';
import PageContent from './components/PageContent';
import { Song } from '@/types';
import getHollywoodSongs from '@/actions/getHollywoodSongs';
import getFrienshipSong from '@/actions/getFriendshipSongs';
import getRapSongs from '@/actions/getRapSongs';
import getMalayalamSongs from '@/actions/getMalayalamSong';
import getHindiSongs from '@/actions/getHindiSongs';
import getTeleguSongs from '@/actions/getTeleguSongs';
import getItemSongs from '@/actions/getItemSongs';
import Footer from '@/Components/Footer';


export default function Home() {

  const [lovesongs, setLoveSongs] = useState<Song[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [HollywoodSongs,setHollywoodSongs] = useState<Song[]>([]);
  const [FriendshipSongs,setFriendshipSongs] = useState<Song[]>([]);
  const [SisterSongs,setSisterSongs] = useState<Song[]>([]);
  const [SadSongs,setSadSongs] = useState<Song[]>([]);
  const [RapSongs,setRapSongs] = useState<Song[]>([]);
  const [MalayalamSongs,setMalayalamSongs] = useState<Song[]>([]);
  const [HindiSongs,setHindiSongs] = useState<Song[]>([]);
  const [TeleguSongs,setTeleguSongs] = useState<Song[]>([]); 
  const [ItemSongs,setItemSongs] = useState<Song[]>([]);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const [
          loveSongsData,
          allSongsData,
          hollywoodSongsData,
          FriendshipSongData,
          SistserSongData,
          SadSongsData,
          RapSongsData,
          MalayalamSongData,
          HindiSongsData,
          TeleguSongsData,
          ItemSongsData,
        ] = await Promise.all([
          getLoveSong(),
          getSongs(),
          getHollywoodSongs(),
          getFrienshipSong(),
          getSisterSong(),
          getSadSong(),
          getRapSongs(),
          getMalayalamSongs(),
          getHindiSongs(),
          getTeleguSongs(),
          getItemSongs(),
        ]);
  
        setHollywoodSongs(hollywoodSongsData);
        setLoveSongs(loveSongsData);
        setSongs(allSongsData);
        setFriendshipSongs(FriendshipSongData);
        setSisterSongs(SistserSongData);
        setSadSongs(SadSongsData);
        setRapSongs(RapSongsData);
        setMalayalamSongs(MalayalamSongData);
        setHindiSongs(HindiSongsData);
        setTeleguSongs(TeleguSongsData);
        setItemSongs(ItemSongsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchSongs();
  }, []);
  
 

  return (

    

    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/newlikeimage.png" name="liked songs" href="liked" />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">All Songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Sister Songs</h1>
        </div>
        <PageContent songs={SisterSongs} />
      </div>
      

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Love Hits</h1>
        </div>
        <PageContent songs={lovesongs} />
      </div>
      
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">English Hits</h1>
        </div>
        <PageContent songs={HollywoodSongs} />
      </div>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Friendship Songs</h1>
        </div>
        <PageContent songs={FriendshipSongs}/>
      </div>

      
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Sad Songs</h1>
        </div>
        <PageContent songs={SadSongs}/>
      </div>

      
      
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Party Songs</h1>
        </div>
        <PageContent songs={RapSongs}/>
      </div>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Malayalam Songs</h1>
        </div>
        <PageContent songs={MalayalamSongs}/>
      </div>


      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Hindi Songs</h1>
        </div>
        <PageContent songs={HindiSongs}/>
      </div>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Item Songs</h1>
        </div>
        <PageContent songs={ItemSongs}/>
      </div>

       
       
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Telugu Songs</h1>
        </div>
        <PageContent songs={TeleguSongs}/>
      </div>
      <Footer/>
    </div>
   

  );
}
