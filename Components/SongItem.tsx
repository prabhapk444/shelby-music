import Image from "next/image";
import { FiDownload, FiShare } from "react-icons/fi";
import useLoadingImage from "@/hooks/useLoadingImage";
import { Song } from "@/types";
import PlayButton from "./PlayButton";
import { createClient } from '@supabase/supabase-js';
import toast from "react-hot-toast";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase environment variables are not set.');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadingImage(data);

  const handleDownload = async () => {
    try {
      const { data: songData, error } = await supabase.storage
        .from('songs')
        .createSignedUrl(data.song_path, 3600);
      if (error) {
        throw error;
      }
      if (songData?.signedUrl) {
        window.open(songData.signedUrl, "_blank");
        toast.success("Song download started!");
      } else {
        throw new Error("Failed to get download URL from Supabase.");
      }
    } catch (error) {
      console.error("Error downloading song:", error);
      toast.error("Failed to download song.");
    }
  };
  const handleShare = async () => {
    try {
      const { data: songData, error } = await supabase.storage
        .from('songs')
        .createSignedUrl(data.song_path, 3600);
      if (error) {
        throw error;
      }
      if (songData?.signedUrl) {
      
        const response = await fetch(songData.signedUrl);
        const blob = await response.blob();
  
       
        const file = new File([blob], `${data.title}.mp3`, { type: 'audio/mpeg' });
  
      
        navigator.share({
          title: data.title,
          text: `Check out this song: ${data.title} by ${data.author}`,
          url: window.location.href,
          files: [file]
        })
          .then(() => toast.success('Successful share'))
          .catch((error) => console.log('Error sharing:', error));
      } else {
        throw new Error("Failed to get signed URL for sharing.");
      }
    } catch (error) {
      console.error("Error sharing song:", error);
      toast.error("Failed to share song.");
    }
  };
  
  
  return (
    <div
      onClick={() => onClick(data.id)}
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || '/images/music-placeholder.png'}
          alt="Image"
          quality={75}
          fill
          unoptimized={true}
          priority
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">By {data.author}</p>
        <div className="flex gap-x-2">
          <FiDownload
            className="text-cyan-600 text-2xl hover:text-cyan-600 cursor-pointer"
            onClick={handleDownload} 
          />
          <FiShare
            className="text-cyan-600 text-2xl hover:text-cyan-600 cursor-pointer"
            onClick={handleShare} 
          />
        </div>
      </div>
      <div className="absolute bottom-24 right-5 flex items-center">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
