import React, { useState, useId, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/utils/supabaseClient";
import { FiX } from "react-icons/fi";
import ReactPlayer from "react-player";

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

  const uniqueId = () => String(Math.round(Date.now() * Math.random()));

  useEffect(() => {
    console.log(uniqueId());
  }, []);

  const addSong = async () => {
    const response = await axios.get(
      `https://noembed.com/embed?dataType=json&url=${newSong}`
    );

    setSongs(
      (prevstate: any) => [
        ...prevstate,
        { url: newSong, title: response.data.title, id: uniqueId() },
      ],
      async (newState: any) => {
        const { error } = await supabase
          .from("rooms")
          .update({ songs: newState })
          .eq("room_code", room_code);
        if (error) console.log(error);
        setNewSong("");
      }
    );
  };

  const deleteSong = async () => {};

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="flex w-10/12 gap-2 justify-around">
        <input
          className="w-8/12 h-[32px] rounded-md placeholder:text-sm px-2 py-2 text-sm"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
          placeholder="New Song"
        />
        <button
          onClick={addSong}
          className="bg-white rounded-md text-sm flex-1"
        >
          Submit
        </button>
      </div>
      <div className="bg-white/30 rounded-xl p-3 w-10/12 text-sm flex flex-col gap-2">
        {songs.map((song, index) => (
          <div key={song.url} className="flex gap-2">
            <p>{index + 1}</p>
            <p className="flex-1">{song.title}</p>
            <FiX className="" />
          </div>
        ))}
      </div>

      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        width={"320px"}
        height={"180px"}
        style={{ borderRadius: "20px" }}
      />

      {/* <button onClick={() => setPlaylist((prevstate) => [...prevstate, newSong])}>Add song</button> */}
    </div>
  );
};

export default MusicSection;
