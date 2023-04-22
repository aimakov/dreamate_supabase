import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { supabase } from "@/utils/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/store/authSlice";
import axios from "axios";
import { actionError } from "@/store/popupSlice";
import { skillLevels } from "@/utils/skillLevels";
import Radio from "@/components/Radio";

import Checkbox from "@/components/Checkbox";
import { FiX } from "react-icons/fi";

type Props = {};

const Room = (props: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id: room_code } = router.query;
    const user = useSelector(selectUser);

    const [roomDetails, setRoomDetails] = useState<any>({});

    const [showTeamsSection, setShowTeamsSection] = useState(false);
    const [opacityTeamsSection, setOpacityTeamsSection] = useState(false);
    const [showMusicSection, setShowMusicSection] = useState(false);

    const [playerName, setPlayerName] = useState("");
    const [playerSkill, setPlayerSkill] = useState<null | number>();
    const [players, setPlayers] = useState([]);

    const teamsRef = useRef<HTMLInputElement>();

    const getRoomDetails = async () => {
        try {
            const { data, error } = await supabase.from("rooms").select().eq("room_code", room_code);

            if (error) throw error;

            console.log("Room details");
            console.log(data);

            setRoomDetails(data[0]);
        } catch (error) {
            router.push("/");
            console.log(error);
        }
    };

    const leaveRoom = async () => {
        try {
            console.log("user_id: " + user.id);
            console.log("room_code: " + room_code);

            const response = await axios.post("/api/leaveRoom", {
                room_code: room_code,
                user_id: user.id,
            });

            if (response.data.success) router.push("/rooms");
        } catch (error) {
            console.log(error);
        }
    };

    const closeRoom = async () => {
        try {
            const { error } = await supabase.from("rooms").delete().eq("room_code", room_code);
            if (error) throw error;

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(showTeamsSection);
    }, [showTeamsSection]);

    useEffect(() => {
        if (room_code) getRoomDetails();
    }, [room_code]);

    useEffect(() => {
        let timeout;

        if (showTeamsSection) {
            if (teamsRef.current !== undefined) {
                teamsRef.current.style.display = "flex";
            }

            timeout = setTimeout(() => {
                if (teamsRef.current !== undefined) {
                    teamsRef.current.style.opacity = "100%";
                    teamsRef.current.style.scale = "100%";
                }
            }, 100);
        } else {
            teamsRef.current.style.display = "none";
            teamsRef.current.style.opacity = "0%";
            teamsRef.current.style.scale = "90%";
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [showTeamsSection]);

    useEffect(() => {
        console.log(playerSkill);
    }, [playerSkill]);

    const addPlayer = () => {
        setPlayers((prevstate) => [...prevstate, { name: playerName, skill: playerSkill }]);
        setPlayerName("");
        setPlayerSkill(null);
    };

    const deletePlayer = (name: string) => {
        setPlayers(players.filter((player) => player.name !== name));
    };

    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col justify-start items-center font-comfortaa pt-4 gap-4 transition-all">
                <h2 className="text-xl text-[24px]">
                    Room Code: <span className="font-bold">{room_code}</span>
                </h2>
                {roomDetails?.host === user?.id && <p>You are the Host.</p>}

                <div className=" w-[200px] flex gap-4 max-w-xs justify-between">
                    <Checkbox value={showTeamsSection} name={"Teams"} onChange={() => setShowTeamsSection((prevstate) => !prevstate)} />
                    <Checkbox value={showMusicSection} name={"Music"} onChange={() => setShowMusicSection((prevstate) => !prevstate)} />
                </div>

                <div ref={teamsRef} className={`transition-all gap-3 w-full flex flex-col items-center ${showTeamsSection ? " opacity-100" : " opacity-0"}`}>
                    <div className="w-11/12 rounded-xl bg-white/30  flex flex-col items-center py-3 px-3 gap-2">
                        <input
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Player's name"
                            className="w-full rounded-md py-[5px] px-3 placeholder:text-sm placeholder:text-gray-500 text-sm "
                        />
                        <div className="my-3 grid grid-cols-2 grid-rows-2 w-full px-2 gap-y-2">
                            {skillLevels.map((skillLevel) => (
                                <Radio
                                    setPlayerSkill={setPlayerSkill}
                                    name={skillLevel.id}
                                    value={skillLevel.value}
                                    checked={playerSkill === skillLevel.value}
                                />
                            ))}
                        </div>
                        <button onClick={addPlayer} className="bg-white w-[100px] text-center h-[32px] rounded-full text-sm">
                            Add Player
                        </button>
                    </div>
                    <div className="w-11/12 rounded-xl bg-white/30  flex flex-col items-center py-3 px-3 gap-2">
                        {players.length > 0 ? (
                            <div className="w-full flex flex-col gap-2">
                                {players.map((player) => (
                                    <div className="text-sm w-full flex justify-between px-4">
                                        <p>{player.name}</p>{" "}
                                        <div className="flex gap-2">
                                            <p className="text-xs">{skillLevels.reduce((acc, val) => [...acc, val.id], [])[player.skill - 1]}</p>
                                            <FiX onClick={() => deletePlayer(player.name)} className="" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className=" text-sm">No players in the room.</p>
                        )}
                    </div>
                </div>

                {roomDetails?.users?.includes(user?.id) && (
                    <button onClick={leaveRoom} className="w-[130px] py-[10px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all">
                        Leave Room
                    </button>
                )}

                {roomDetails?.host === user?.id && (
                    <button onClick={closeRoom} className="w-[130px] py-[10px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all">
                        Close Room
                    </button>
                )}
            </div>
        </Layout>
    );
};

export default Room;
