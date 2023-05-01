import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "axios";
import { supabase } from "@/utils/supabaseClient";

type Song = {
    url: string;
    title: string;
};

type Props = {
    songs: Song[];
    setSongs: any;
    room_code: string;
};

const MusicSection = ({ songs, setSongs, room_code }: Props) => {
    const [newSong, setNewSong] = useState("");

    const addSong = async () => {
        const response = await axios.get(`https://noembed.com/embed?dataType=json&url=${newSong}`);

        setSongs(
            (prevstate: any) => [...prevstate, { url: newSong, title: response.data.title }],
            async (newState: any) => {
                const { error } = await supabase.from("rooms").update({ songs: newState }).eq("room_code", room_code);
                if (error) console.log(error);
            }
        );
    };

    const getSong = async () => {
        const vidurl = "https://www.youtube.com/watch?v=I_izvAbhExY";

        const response = await axios.get(`https://noembed.com/embed?dataType=json&url=${vidurl}`);
        console.log(response.data.title);
    };

    useEffect(() => {
        getSong();
    }, []);

    return (
        <div className="flex flex-col items-center w-full gap-2">
            <div className="flex w-10/12 gap-2 justify-around">
                <input
                    className="w-8/12 h-[32px] rounded-md placeholder:text-sm px-2 py-2 text-sm"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                    placeholder="New Song"
                />
                <button onClick={addSong} className="bg-white rounded-md text-sm flex-1">
                    Submit
                </button>
            </div>
            <div className="bg-white/30 rounded-xl p-3 w-10/12">
                {songs.map((song) => (
                    <p key={song.url}>{song.title}</p>
                ))}
            </div>

            {/* <button onClick={() => setPlaylist((prevstate) => [...prevstate, newSong])}>Add song</button> */}
        </div>
    );
};

export default MusicSection;
