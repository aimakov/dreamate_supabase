import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { actionError } from "@/store/popupSlice";

type Props = {};

const Join = (props: Props) => {
    const user = useSelector(selectUser);
    const router = useRouter();
    const dispatch = useDispatch();
    const [roomCode, setRoomCode] = useState("");

    const typeRoomCode = (e: any) => {
        if (e.target.value.length > 6) return;
        else setRoomCode(e.target.value);
    };

    const joinRoom = async () => {
        if (user.id) {
            const response = await axios.post("api/joinRoom", {
                room_code: roomCode.toUpperCase(),
                user_id: user.id,
            });

            if (response.data.success) router.push("rooms/" + roomCode.toUpperCase());
        } else {
            dispatch(actionError({ message: "You are not logged in." }));
        }
    };

    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col justify-center items-center font-montserrat">
                <div className="w-[280px] h-[280px] bg-white/30 rounded-[20px] shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-medium mb-[14px]">Enter Room Code:</h2>
                    <input value={roomCode} onChange={typeRoomCode} className=" p-4 rounded-[4px] mb-[32px] text-center uppercase text-lg" />
                    <div className="flex flex-col gap-2">
                        <button
                            disabled={roomCode.length < 6}
                            onClick={joinRoom}
                            className=" disabled:bg-gray-300 disabled:hover:cursor-not-allowed w-[130px] py-[10px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all"
                        >
                            Join Room
                        </button>
                        <button onClick={() => router.back()} className="w-[130px] py-[10px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all">
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Join;
