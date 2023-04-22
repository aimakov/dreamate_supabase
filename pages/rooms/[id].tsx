import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { supabase } from "@/utils/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/store/authSlice";
import axios from "axios";
import { actionError } from "@/store/popupSlice";

import Checkbox from "@/components/Checkbox";

type Props = {};

const Room = (props: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id: room_code } = router.query;
    const user = useSelector(selectUser);

    const [roomDetails, setRoomDetails] = useState<any>({});

    const [showTeamsSection, setShowTeamsSection] = useState(false);
    const [showMusicSection, setShowMusicSection] = useState(false);

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

                <div className={`transition-all ${showTeamsSection ? "block opacity-100" : "hidden opacity-0"}`}>Teams</div>

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
