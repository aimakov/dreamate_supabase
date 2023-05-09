import React, { useState, useId, useEffect, MouseEventHandler } from "react";
import axios from "axios";
import { supabase } from "@/utils/supabaseClient";
import { FiX } from "react-icons/fi";
import ReactPlayer from "react-player";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { showModal } from "@/store/modalSlice";

import {
  IoPlayOutline,
  IoPauseOutline,
  IoPlaySkipForwardOutline,
} from "react-icons/io5";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";

type Song = {
  url: string;
  title: string;
  id: string;
};

type Props = {
  songs: Song[];
  setSongs: any;
  room_code: string;
  setModalAction: any;
  user: any;
  host: string;
};

const MusicSection = ({
  songs,
  setSongs,
  room_code,
  setModalAction,
  user,
  host,
}: Props) => {
  const dispatch = useDispatch();
  // const [modalAction, setModalAction] = useState<MouseEventHandler>();

  const [newSong, setNewSong] = useState("");

  const [playing, setPlaying] = useState(false);

  const [musicTabOpen, setMusicTabOpen] = useState(true);

  const uniqueId = () => String(Math.round(Date.now() * Math.random()));

  useEffect(() => {
    console.log(user.id + " " + host);
  }, []);

  const showDeleteSongModal = (name: string, id: string) => {
    dispatch(
      showModal({
        message: `Delete ${name}?`,
      })
    );

    setModalAction(() => () => deleteSong(id));
  };

  const deleteSong = async (id: string) => {
    setSongs(
      (prevstate: any) => prevstate.filter((song) => song.id !== id),

      async (newState: any) => {
        const { error } = await supabase
          .from("rooms")
          .update({ songs: newState })
          .eq("room_code", room_code);
        if (error) console.log(error);
      }
    );
  };

  const addSong = async () => {
    const response = await axios.get(
      `https://noembed.com/embed?dataType=json&url=${newSong}`
    );

    if (songs?.length) {
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
    } else {
      setSongs(
        [{ url: newSong, title: response.data.title, id: uniqueId() }],
        async (newState: any) => {
          const { error } = await supabase
            .from("rooms")
            .update({ songs: newState })
            .eq("room_code", room_code);
          if (error) console.log(error);
          setNewSong("");
        }
      );
    }
  };

  const showSkipSongModal = () => {
    dispatch(
      showModal({
        message: `Skip ${songs[0].title}?`,
      })
    );

    setModalAction(() => skipSong);
  };

  const skipSong = async () => {
    setSongs(
      (prevstate: any) => prevstate.slice(1),

      async (newState: any) => {
        const { error } = await supabase
          .from("rooms")
          .update({ songs: newState })
          .eq("room_code", room_code);
        if (error) console.log(error);
      }
    );
  };

  return (
    <>
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

        <div className="flex flex-col w-10/12 items-center gap-4 rounded-xl">
          {songs.length ? (
            <>
              <div
                className={`w-full flex flex-col py-4 rounded-xl bg-white/30 ${
                  musicTabOpen ? "gap-4" : null
                }`}
              >
                <ReactPlayer
                  playing={playing}
                  url={songs[0]?.url ?? ""}
                  width={"320px"}
                  height={musicTabOpen ? "180px" : "0px"}
                  style={{
                    borderRadius: "20px",
                    transition: "all ease-out 0.5s",
                  }}
                  onEnded={skipSong}
                />

                {user.id === host && (
                  <div className="flex w-full justify-center gap-20 items-center text-2xl">
                    {playing ? (
                      <IoPauseOutline
                        onClick={() => setPlaying(false)}
                        className=" hover:cursor-pointer"
                      />
                    ) : (
                      <IoPlayOutline
                        onClick={() => setPlaying(true)}
                        className=" hover:cursor-pointer"
                      />
                    )}

                    <IoPlaySkipForwardOutline
                      onClick={showSkipSongModal}
                      className=" hover:cursor-pointer"
                    />
                    {musicTabOpen ? (
                      <SlArrowUp
                        className="text-[22spx] hover:cursor-pointer"
                        onClick={() => setMusicTabOpen(false)}
                      />
                    ) : (
                      <SlArrowDown
                        className="text-[22spx] hover:cursor-pointer"
                        onClick={() => setMusicTabOpen(true)}
                      />
                    )}

                    {/* <button onClick={skipSong}>Skip</button> */}
                  </div>
                )}
              </div>

              <div className="bg-white/30 rounded-xl p-3 w-full text-sm flex flex-col gap-2 max-h-[300px] no-scroll">
                {songs?.map((song, index) => (
                  <>
                    <div
                      key={song.id}
                      className={`flex gap-2 ${
                        index === 0
                          ? " font-bold border-b-[1px] pb-2 mb-1 border-black"
                          : null
                      }`}
                    >
                      <p className="w-[20px]">{index !== 0 ? index : null}</p>
                      <p className="flex-1">{song.title}</p>
                      {index !== 0 ? (
                        <FiX
                          className=" hover:cursor-pointer"
                          onClick={() => {
                            showDeleteSongModal(song.title, song.id);
                          }}
                        />
                      ) : (
                        <div />
                      )}
                    </div>
                    {index === 0 && (
                      <div className="mx-auto text-[16px]">Up next:</div>
                    )}
                  </>
                ))}
              </div>
            </>
          ) : (
            <p className="w-full bg-white/30 p-2 text-center rounded-xl">
              There are no songs
            </p>
          )}
        </div>

        {/* <button onClick={() => setPlaylist((prevstate) => [...prevstate, newSong])}>Add song</button> */}
      </div>
    </>
  );
};

export default MusicSection;
