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
import { FiX, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useStateCallback } from "@/hooks/useStateCallback";
import { generateTeams } from "@/functions/generateTeams";
import { balanceTeams } from "@/functions/gptGenerateTeams";

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
    const [players, setPlayers] = useStateCallback([]);

    const teamsRef = useRef<HTMLInputElement>();

    const [loading, setLoading] = useState(false);
    const [teamsNumber, setTeamsNumber] = useState(2);

    const [shuffledPlayers, setShuffledPlayers] = useState([]);

    const [showTeams, setShowTeams] = useState(false);

    const getRoomDetails = async () => {
        try {
            const { data, error } = await supabase.from("rooms").select().eq("room_code", room_code);

            if (error) throw error;

            setRoomDetails(data[0]);
            setPlayers(data[0].players);
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
        if (room_code) getRoomDetails();
    }, [room_code]);

    //   useEffect(() => {
    //     if (shuffledPlayers.length) {
    //       console.log("Filtering");
    //       console.log(
    //         shuffledPlayers.filter((player: any) => player.team === `Team_1`)
    //       );
    //     }
    //   }, [shuffledPlayers]);

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

    const addPlayer = () => {
        if (players?.length) {
            if (players.reduce((acc, val) => [...acc, val.name.toUpperCase()], []).includes(playerName.toUpperCase())) {
                dispatch(actionError({ message: "Such user already exists." }));
                setPlayerName("");
                setPlayerSkill(null);
                return;
            }
            setPlayers(
                (prevstate: any) => [...prevstate, { name: playerName, skill: playerSkill }],
                async (newState: any) => updatePlayersSupabase(newState)
            );
        } else {
            setPlayers([{ name: playerName, skill: playerSkill }], async (newState: any) => updatePlayersSupabase(newState));
        }

        setPlayerName("");
        setPlayerSkill(null);
    };

    const deletePlayer = (name: string) => {
        setPlayers(players.filter((player) => player.name !== name));
    };

    // const deletePlayer = (name) => {
    //     setPlayers(players.filter((player) => player.name !== name));
    //     setShuffledPlayers(
    //         (prevstate: any) => [...prevstate, { name: playerName, skill: playerSkill }],
    //         async (newState: any) => updatePlayersSupabase(newState)
    //     );
    //     setPlayerName("");
    //     setPlayerSkill(null);
    // };

    const updatePlayersSupabase = async (players: any) => {
        const { error } = await supabase.from("rooms").update({ players: players }).eq("room_code", room_code);
        if (error) {
            dispatch(actionError({ message: error.message }));
            return;
        }
    };

    // const getPlayers = async () => {
    //     const { data, error } = await supabase.from("rooms").select("players").eq("room_code", room_code);
    //     if (error) {
    //         dispatch(actionError({ message: error.message }));
    //         return;
    //     }

    //     console.log(data);
    // };

    // useEffect(() => {
    //     if (players.length) {
    //         updatePlayersSupabase();
    //     }
    // }, [players]);

    const shuffleTeams = () => {
        // console.log(generateTeams(teamsNumber, players));
        // setShuffledPlayers(generateTeams(teamsNumber, players));
        setPlayers(generateTeams(teamsNumber, players), (newstate) => updatePlayersSupabase(newstate));

        setShowTeams(true);
    };

    useEffect(() => {
        if (players.filter((player) => player.team !== undefined).length) {
            shuffleTeams();
        }
    }, [teamsNumber]);

    const logging = () => {
        if (shuffledPlayers.filter((player) => player.team !== undefined).length)
            console.log(shuffledPlayers.filter((player) => player.team !== undefined).length);
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
                                    key={skillLevel.id}
                                    setPlayerSkill={setPlayerSkill}
                                    name={skillLevel.id}
                                    value={skillLevel.value}
                                    checked={playerSkill === skillLevel.value}
                                />
                            ))}
                        </div>
                        {/* <button
                            onClick={() => {
                                console.log(players);
                            }}
                            className="bg-white w-[100px] text-center h-[32px] rounded-full text-sm"
                        >
                            Add Player
                        </button> */}
                        <button onClick={addPlayer} className="bg-white w-[100px] text-center h-[32px] rounded-full text-sm">
                            Add Player
                        </button>
                    </div>
                    <div className="w-11/12 rounded-xl bg-white/30  flex items-center py-2 px-3 gap-2 justify-around">
                        <div className="flex flex-col text-sm gap-1">
                            <div>Teams #</div>
                            <div className="flex items-center justify-around">
                                <FiMinusCircle onClick={() => setTeamsNumber((prevstate) => (prevstate > 2 ? prevstate - 1 : prevstate))} />
                                <span>{teamsNumber}</span>
                                <FiPlusCircle onClick={() => setTeamsNumber((prevstate) => prevstate + 1)} />
                            </div>
                        </div>
                        <button onClick={shuffleTeams} className="w-2/6 bg-white rounded-xl self-stretch text-sm">
                            Shuffle
                        </button>
                        <div className="flex flex-col items-center justify-center text-sm gap-1">
                            <p>Players #</p>
                            {players?.length ?? 0}
                        </div>
                    </div>
                    {showTeams ? (
                        <div className="w-11/12 rounded-xl bg-white/30  flex flex-col items-center py-3 px-3 gap-2">
                            <div className="w-full flex  gap-2 justify-around flex-wrap">
                                {[...new Array(teamsNumber)].map((el, i) => (
                                    <div key={i} className="">
                                        <h2>Team #{i + 1}</h2>
                                        <div>
                                            {players
                                                .filter((player: any) => player.team === i + 1)
                                                .map((player: any) => (
                                                    <div key={player.name} className="text-[13px]">
                                                        {player.name} {player.skill}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {players.filter((player) => player.team !== undefined).length !== players.length ? (
                                <div className="w-full flex flex-col gap-2">
                                    <h2 className="text-center">Unshuffled players: </h2>
                                    {players.map((player) => {
                                        if (player.team === undefined)
                                            return (
                                                <div key={player.name} className="text-sm w-full flex justify-between px-4">
                                                    <p>{player.name}</p>{" "}
                                                    <div className="flex gap-2">
                                                        <p className="text-xs">{skillLevels.reduce((acc, val) => [...acc, val.id], [])[player.skill - 1]}</p>
                                                        <FiX onClick={() => deletePlayer(player.name)} className="" />
                                                    </div>
                                                </div>
                                            );
                                    })}
                                </div>
                            ) : null}
                            <button onClick={() => setShowTeams(false)} className="bg-white px-2 py-2 rounded-xl text-sm mt-2">
                                Show players
                            </button>
                        </div>
                    ) : (
                        <div className="w-11/12 rounded-xl bg-white/30  flex flex-col items-center py-3 px-3 gap-2">
                            {players?.length > 0 ? (
                                <>
                                    <div className="w-full flex flex-col gap-2">
                                        {players.map((player) => (
                                            <div key={player.name} className="text-sm w-full flex justify-between px-4">
                                                <p>{player.name}</p>{" "}
                                                <div className="flex gap-2">
                                                    <p className="text-xs">{skillLevels.reduce((acc, val) => [...acc, val.id], [])[player.skill - 1]}</p>
                                                    <FiX onClick={() => deletePlayer(player.name)} className="" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {players.filter((player) => player.team !== undefined).length > 0 && (
                                        <button onClick={() => setShowTeams(true)} className="bg-white px-2 py-2 rounded-xl text-sm mt-2">
                                            Show teams
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p className=" text-sm">No players in the room.</p>
                            )}
                        </div>
                    )}
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
