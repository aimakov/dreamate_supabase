import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { generateRoomCode } from "@/functions/generateRoomCode";
import axios from "axios";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, loginSuccess, logoutSuccess, loginError } from "@/store/authSlice";
import { actionError, actionSuccess } from "@/store/popupSlice";
// interface Room {
//     id: string,
//     room_code: string,
//     created_at: Date,
//     players:
// }

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    // const getRooms = async () => {
    //     try {
    //         const { data, error } = await supabase.from("rooms").select("room_code");
    //         if (error) throw error;

    //         if (data.length) return data.reduce((acc: any, val) => [...acc, val.room_code], []);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const signin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    const signOut = async () => {
        console.log("signing out");
        const { error } = await supabase.auth.signOut();
        dispatch(logoutSuccess({}));
    };

    const createRoom = async () => {
        try {
            console.log(Object.keys(user).length);
            if (!Object.keys(user).length) dispatch(actionError({ message: "Error" }));
            else dispatch(actionSuccess({ message: "Success" }));
            // if (!Object.keys(user).length) {
            //     console.log("sdfsdf");
            //     setNotification({ message: "Message", type: "ERROR" });
            // } else setNotification({ type: "SUCCESS", message: "Room created." });
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

    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <img src={"/logo.png"} alt="logo" className="w-3/4" />

                <div className="flex flex-col mt-10 gap-3">
                    <button onClick={createRoom} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        Create room
                    </button>

                    <button onClick={() => router.push("/join")} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        Join room
                    </button>

                    <button onClick={signin} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        Sign in
                    </button>

                    <button onClick={signOut} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        Sign out
                    </button>
                </div>
            </div>
        </Layout>
    );
}
