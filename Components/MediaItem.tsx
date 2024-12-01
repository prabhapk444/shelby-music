"use client";

import useLoadingImgae from "@/hooks/useLoadingImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const player = usePlayer();
    const imageUrl = useLoadingImgae(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        return player.setId(data.id);
    };

    return (
        <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md transition ease-in-out duration-200"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
            <Image
    src={imageUrl || '/images/liked.png'} 
    quality={75}
    fill
    unoptimized={true}
    alt={`${data.title} cover art`}
    className="object-cover"
    loading="lazy"
    sizes="(max-width: 768px) 48px, (max-width: 1024px) 64px, 80px" 
/>

            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">{data.author}</p>
            </div>
        </div>
    );
};

export default MediaItem;
