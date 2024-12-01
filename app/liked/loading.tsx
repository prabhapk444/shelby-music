"use client";

import { FiHeadphones } from "react-icons/fi"; 
import Box from "@/Components/Box";

const MusicLoader = () => {
  return ( 
    <Box className="h-full flex items-center justify-center">
      <div className="text-center">
        <FiHeadphones size={48} color="#22c55e" />
        <br />
        <span className="text-gray-600 text-lg">Loading Music...</span>
      </div>
    </Box>
  );
}
 
export default MusicLoader;
