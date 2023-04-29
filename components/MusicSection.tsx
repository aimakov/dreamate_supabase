import React, { useState } from "react";
import axios from "axios";
import { supabase } from "@/utils/supabaseClient";

type Props = {};

const MusicSection = (props: Props) => {
    const [playlist, setPlaylist] = useState([]);
    const [newSong, setNewSong] = useState("");

    return (
        <div className="flex flex-col items-center w-full gap-2">
            <div className="bg-white/30 rounded-xl p-3 w-10/12">
                {playlist.map((song) => (
                    <p key={song}>{song}</p>
                ))}
            </div>
            <input value={newSong} onChange={(e) => setNewSong(e.target.value)} placeholder="New Song" />
            <button onClick={() => setPlaylist((prevstate) => [...prevstate, newSong])}>Add song</button>
        </div>
    );
};

export default MusicSection;
