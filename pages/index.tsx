import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { generateRoomCode } from "@/functions/generateRoomCode";
import axios from "axios";
import { useRouter } from "next/router";

import Popup from "@/components/Popup";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, loginSuccess, logoutSuccess, loginError } from "@/store/authSlice";
// interface Room {
//     id: string,
//     room_code: string,
//     created_at: Date,
//     players:
// }

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [notification, setNotification] = useState<any>();
    const user = useSelector((state: any) => state.user);

    const getRooms = async () => {
        try {
            const { data, error } = await supabase.from("rooms").select("room_code");
            if (error) throw error;

            if (data.length) return data.reduce((acc: any, val) => [...acc, val.room_code], []);
        } catch (error) {
            console.log(error);
        }
    };

    const userCheck = async () => {
        // const response = await axios.post("api/checkUser");
        // console.log(response);
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            console.log(session);
        } catch (error: any) {
            console.log(error.message);
            dispatch(loginError);
        }
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // if (response.data.user_in_room) router.push("rooms/" + response.data.room.room_code);
    };

    const createRoom = async () => {
        try {
            if (!Object.keys(user || {}).length) setNotification({ message: "Message", type: "ERROR" });
            else setNotification({ type: "SUCCESS", message: "Room created." });
            // const { data: roomCodes_data, error: roomCodes_error } = await supabase.from("rooms").select("room_code");
            // if (roomCodes_error) throw roomCodes_error;

            // const uniqueRoomCode = generateRoomCode(roomCodes_data);

            // console.log(uniqueRoomCode);

            // const { error } = await supabase.from("rooms").insert({ room_code: uniqueRoomCode });
            // if (error) throw error;

            // console.log("New room created: " + uniqueRoomCode);

            // router.push("rooms/" + uniqueRoomCode);
        } catch (error) {
            console.log(error);
        }
    };

    const testSession = async () => {
        const response = await axios.post("api/createRoom");

        console.log(response);
    };

    useEffect(() => {
        userCheck();
    }, []);

    return (
        <Layout>
            <Popup notification={notification} />
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <img src={"/logo.png"} alt="logo" className="w-3/4" />

                <div className="flex flex-col mt-10 gap-3">
                    <button onClick={createRoom} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        Create room
                    </button>

                    <button onClick={() => router.push("/join")} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        Join room
                    </button>
                </div>
            </div>
        </Layout>
    );
}
